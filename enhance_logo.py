from PIL import Image, ImageEnhance
import os

input_path = "public/logo.jpeg"
output_path = "public/logo.png"
icon_path = "app/icon.png"

# Check if image exists
if os.path.exists(input_path):
    img = Image.open(input_path).convert("RGBA")
    
    # Enhance sharpness
    enhancer = ImageEnhance.Sharpness(img)
    img = enhancer.enhance(1.5)
    
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(img)
    img = enhancer.enhance(1.1)
    
    # Make white background transparent (simple approach)
    # We will get data and make near-white pixels transparent
    datas = img.getdata()
    new_data = []
    
    # Let's get the color of the top-left pixel to guess the background
    bg_color = img.getpixel((0, 0))
    # If the background is mostly white
    if bg_color[0] > 240 and bg_color[1] > 240 and bg_color[2] > 240:
        for item in datas:
            # Change all white (also shades of whites)
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        img.putdata(new_data)
        
    # Save as PNG
    img.save(output_path, "PNG")
    print(f"Saved enhanced logo to {output_path}")
    
    # Save as icon.png for Next.js app router favicon
    icon_img = img.resize((32, 32), Image.Resampling.LANCZOS)
    icon_img.save(icon_path, "PNG")
    print(f"Saved favicon to {icon_path}")
else:
    print(f"File {input_path} not found.")
