import math
import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image(output_path="public/og-card.png"):
    width, height = 1200, 630
    img = Image.new("RGB", (width, height), (6, 16, 11))
    draw = ImageDraw.Draw(img)

    # Radial gradient simulation
    cx, cy = int(width * 0.75), int(height * 0.20)
    max_radius = int(math.hypot(width, height) * 0.8)
    
    # Render subtle radial gradient onto pixels or steps
    for r in range(max_radius, 0, -8):
        factor = 1.0 - (r / max_radius)
        # Interpolate between #06100b (6, 16, 11) and #183b20 (24, 59, 32)
        red = int(6 + (24 - 6) * factor)
        green = int(16 + (59 - 16) * factor)
        blue = int(11 + (32 - 11) * factor)
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(red, green, blue))

    # Grid / Network lines
    line_color = (28, 58, 42, 160)
    points = [(120, 470), (330, 470), (520, 360), (760, 430), (980, 300)]
    for i in range(len(points) - 1):
        draw.line([points[i], points[i+1]], fill=(28, 58, 42), width=2)

    # Nodes
    node_color = (141, 217, 87)
    node_radii = [5, 4, 6, 4, 5]
    for pt, r in zip(points, node_radii):
        draw.ellipse([pt[0] - r, pt[1] - r, pt[0] + r, pt[1] + r], fill=node_color)

    # Fonts
    mono_path = "C:/Windows/Fonts/consola.ttf"
    mono_bold_path = "C:/Windows/Fonts/consolab.ttf"
    serif_path = "C:/Windows/Fonts/georgia.ttf"
    serif_bold_path = "C:/Windows/Fonts/georgiab.ttf"
    serif_italic_path = "C:/Windows/Fonts/georgiai.ttf"

    font_mono_small = ImageFont.truetype(mono_path, 18)
    font_mono_kicker = ImageFont.truetype(mono_bold_path, 22)
    font_mono_sub = ImageFont.truetype(mono_path, 18)
    font_serif = ImageFont.truetype(serif_path, 60)
    font_serif_italic = ImageFont.truetype(serif_italic_path, 60)

    # Header kicker: JORGE GUBERTE
    # Letter spacing emulation
    kicker_text = "J O R G E   G U B E R T E"
    draw.text((90, 110), kicker_text, font=font_mono_kicker, fill=(141, 217, 87))

    sub_text = "P R I N C I P A L   A I   S Y S T E M S   A R C H I T E C T"
    draw.text((90, 160), sub_text, font=font_mono_sub, fill=(126, 149, 132))

    # Main headline
    # "I build AI systems"
    draw.text((90, 250), "I build AI systems", font=font_serif, fill=(240, 248, 242))

    # "that ship — and remember."
    # We can measure parts to color them
    bbox1 = draw.textbbox((90, 325), "that ", font=font_serif)
    draw.text((90, 325), "that ", font=font_serif, fill=(240, 248, 242))

    x_ship = bbox1[2]
    bbox2 = draw.textbbox((x_ship, 325), "ship ", font=font_serif)
    draw.text((x_ship, 325), "ship ", font=font_serif, fill=(184, 244, 122))

    x_and = bbox2[2]
    bbox3 = draw.textbbox((x_and, 325), "— and ", font=font_serif)
    draw.text((x_and, 325), "— and ", font=font_serif, fill=(240, 248, 242))

    x_remember = bbox3[2]
    draw.text((x_remember, 325), "remember.", font=font_serif_italic, fill=(184, 244, 122))

    # Footer domain
    domain_text = "J O R G E G U B E R T E . C O M"
    draw.text((90, 520), domain_text, font=font_mono_small, fill=(96, 115, 102))

    # Sub-footer description
    tagline = "Agent Orchestration · Cognitive Memory · RAG Pipelines · Generative UI"
    draw.text((90, 555), tagline, font=font_mono_small, fill=(168, 185, 172))

    img.save(output_path, "PNG", optimize=True)
    print(f"Generated OG image at {output_path}")

if __name__ == "__main__":
    generate_og_image()
