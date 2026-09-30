"""
사이트 글자만 담은 Pretendard Variable 서브셋 생성기.

사용: python scripts/font-subset.py <PretendardVariable.woff2 또는 .ttf>
  - 원본: https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/woff2/PretendardVariable.woff2
  - app, components, data, lib 소스에 쓰인 글자 + ASCII 전부를 담는다.
  - 굵기 축은 사이트에서 쓰는 400~800만 남긴다.
  - 결과: public/fonts/pretendard-site-<해시>.woff2 와 app/fonts/pretendard/site-subset.css
문구를 바꾸면 다시 실행하고 빌드한다. 빠진 글자는 동적 서브셋(pretendardvariable-dynamic-subset.css)이 채우므로 깨지지 않는다.
"""
import hashlib
import pathlib
import sys

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC_DIRS = ["app", "components", "data", "lib"]


def collect_chars() -> set[int]:
    cps: set[int] = set(range(0x20, 0x7F))
    cps.update(ord(c) for c in "·•…‘’“”–₩×→←↑↓©®™°±")
    for d in SRC_DIRS:
        for p in (ROOT / d).rglob("*"):
            if p.suffix in {".ts", ".tsx", ".css", ".md"} and "fonts" not in p.parts:
                for ch in p.read_text(encoding="utf-8"):
                    cp = ord(ch)
                    if cp >= 0x80 and not (0xD800 <= cp <= 0xDFFF):
                        cps.add(cp)
    return cps


def to_ranges(cps: list[int]) -> str:
    out, start, prev = [], None, None
    for cp in cps:
        if start is None:
            start = prev = cp
        elif cp == prev + 1:
            prev = cp
        else:
            out.append((start, prev))
            start = prev = cp
    if start is not None:
        out.append((start, prev))
    return ", ".join(f"U+{a:X}" if a == b else f"U+{a:X}-{b:X}" for a, b in out)


def main(src: str) -> None:
    font = TTFont(src, lazy=False)
    cmap = font.getBestCmap()
    cps = sorted(cp for cp in collect_chars() if cp in cmap)
    opts = subset.Options()
    opts.layout_features = ["*"]
    opts.flavor = "woff2"
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=cps)
    sub.subset(font)
    font = instancer.instantiateVariableFont(font, {"wght": (400, 800)})
    tmp = ROOT / "public" / "fonts" / "_tmp.woff2"
    tmp.parent.mkdir(parents=True, exist_ok=True)
    font.flavor = "woff2"
    font.save(tmp)
    digest = hashlib.sha1(tmp.read_bytes()).hexdigest()[:8]
    for old in tmp.parent.glob("pretendard-site-*.woff2"):
        old.unlink()
    final = tmp.with_name(f"pretendard-site-{digest}.woff2")
    tmp.rename(final)
    css = f"""/* 생성 파일: scripts/font-subset.py (직접 수정하지 말 것)
   사이트 글자 {len(cps)}자만 담은 Pretendard Variable 서브셋(굵기 400~800). 동적 서브셋보다 뒤에 선언되어
   아래 글자는 이 파일 하나로 그리고, 그 밖의 글자(폼 입력 등)만 동적 서브셋에서 받는다. */
@font-face {{
  font-family: "Pretendard Variable";
  font-style: normal;
  font-display: swap;
  font-weight: 45 920; /* 동적 서브셋과 같은 값이어야 한 묶음으로 글자별 선택이 된다(실제 축은 400~800) */
  src: url("/fonts/{final.name}") format("woff2-variations");
  unicode-range: {to_ranges(cps)};
}}
"""
    (ROOT / "app" / "fonts" / "pretendard" / "site-subset.css").write_text(css, encoding="utf-8")
    print(final.name, final.stat().st_size, "bytes", len(cps), "chars")


if __name__ == "__main__":
    main(sys.argv[1])
