export default function Section3({
  eyebrow = "WE Can't WAIT TO MEET YOU",
  title = "Let’s Talk",
  cta = "Try it free now",
  arrowSrc = "/ContactImages/Arrow.png", 
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        {arrowSrc && (
          <div className="mb-6 flex justify-center">
            <img
              src={arrowSrc}
              alt="Arrow decoration"
              className="h-12 w-auto object-contain"
            />
          </div>
        )}

        <p className="text-sm font-semibold uppercase tracking-wide text-[#252B42]">
          {eyebrow}
        </p>

        <h2 className="mt-4 text-4xl font-semibold text-[#252B42] sm:text-5xl">
          {title}
        </h2>

        <div className="mt-8">
          <button
            type="button"
            className="rounded-md bg-[#23A6F0] px-8 py-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90"
          >
            {cta}
          </button>
        </div>
      </div>
    </section>
  );
}
