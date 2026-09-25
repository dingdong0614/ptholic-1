import Image from "next/image";
import Link from "next/link";

/**
 * 하위 페이지 머리: 매장 실사진을 깐 띠 위에 제목. 사진이 없으면 어두운 단색.
 * photo.stock=true 이면 외부 스톡(Unsplash) URL을 일반 img로 넣고 "참고 이미지" 표시.
 */
export default function PageHero({
  crumb,
  title,
  desc,
  photo,
}: {
  crumb: string;
  title: string;
  desc: string;
  photo?: { src: string; alt?: string; position?: string; stock?: boolean };
}) {
  return (
    <section className={`${photo ? "hero-photo" : "bg-bg-alt"} -mt-16 border-b border-line pt-16`}>
      {photo &&
        (photo.stock ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.src}
            alt=""
            decoding="async"
            className="hero-img"
            style={{ objectPosition: photo.position ?? "center" }}
          />
        ) : (
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className="hero-img object-cover"
            style={{ objectPosition: photo.position ?? "center" }}
          />
        ))}
      <div className="wrap relative pb-10 pt-16 md:pb-14 md:pt-28">
        <nav aria-label="현재 위치" className="text-[14px] text-text-muted">
          <Link href="/" className="hover:text-text">
            홈
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1 className="t-h1 mt-3 max-w-3xl">{title}</h1>
        <p className="mt-4 max-w-xl text-[17px] text-text">{desc}</p>
        {photo?.stock && <p className="mt-3 text-[12px] text-text-faint">배경: 참고 이미지</p>}
      </div>
    </section>
  );
}
