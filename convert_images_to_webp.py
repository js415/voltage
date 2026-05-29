"""Convert site images to WebP for faster loading."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent

# Images referenced by index.html (paths relative to project root)
SITE_IMAGES = [
    "logo.jpeg",
    "jse-products-banner.png",
    "hero-product-showcase.png",
    "PM.jpeg",
    "AP.jpeg",
    "ST.jpeg",
    "PK.jpeg",
    "CW.jpeg",
    "CL.jpeg",
    *sorted((ROOT / "STAPLIZER-IMAGES").glob("*.png")),
    *sorted((ROOT / "COOLER-IMAGES").glob("*.png")),
]


def to_webp(src: Path, quality: int = 82) -> Path:
    dest = src.with_suffix(".webp")
    with Image.open(src) as img:
        if img.mode in ("RGBA", "LA", "P"):
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")
        img.save(dest, "WEBP", quality=quality, method=6)
    return dest


def main() -> None:
    total_before = 0
    total_after = 0
    for entry in SITE_IMAGES:
        src = Path(entry) if isinstance(entry, str) else entry
        if not src.is_absolute():
            src = ROOT / src
        if not src.exists():
            print(f"SKIP (missing): {src.relative_to(ROOT)}")
            continue
        before = src.stat().st_size
        dest = to_webp(src)
        after = dest.stat().st_size
        total_before += before
        total_after += after
        pct = 100 * (1 - after / before) if before else 0
        print(f"{src.name} -> {dest.name}: {before:,} -> {after:,} bytes ({pct:.0f}% smaller)")
    print(f"\nTotal: {total_before:,} -> {total_after:,} bytes")


if __name__ == "__main__":
    main()
