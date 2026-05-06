from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import os

# Constants
TEAL = RGBColor(0x14, 0xA8, 0x98)
DARK_TEAL = RGBColor(0x09, 0x52, 0x4A)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
BLACK = RGBColor(0x33, 0x33, 0x33)
GREY = RGBColor(0x86, 0x86, 0x86)
LIGHT_BG = RGBColor(0xF5, 0xF5, 0xF5)
RED = RGBColor(0xFF, 0x33, 0x5C)
GREEN = RGBColor(0x4C, 0xAF, 0x50)

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)

def add_bg(slide, color):
    bg = slide.background
    fill = bg.fill
    fill.solid()
    fill.fore_color.rgb = color

def add_shape_bg(slide, left, top, width, height, color, alpha=None):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    shape.fill.solid()
    shape.fill.fore_color.rgb = color
    shape.line.fill.background()
    if alpha is not None:
        shape.fill.fore_color.brightness = alpha
    return shape

def add_text_box(slide, left, top, width, height, text, font_size=18, bold=False, color=BLACK, alignment=PP_ALIGN.LEFT, font_name="Calibri"):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.text = text
    p.font.size = Pt(font_size)
    p.font.bold = bold
    p.font.color.rgb = color
    p.font.name = font_name
    p.alignment = alignment
    return txBox

def add_bullet_frame(slide, left, top, width, height, items, font_size=16, color=BLACK, bold_first=False, spacing=Pt(6)):
    txBox = slide.shapes.add_textbox(left, top, width, height)
    tf = txBox.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        if i == 0:
            p = tf.paragraphs[0]
        else:
            p = tf.add_paragraph()
        p.text = item
        p.font.size = Pt(font_size)
        p.font.color.rgb = color
        p.font.name = "Calibri"
        p.space_after = spacing
        if bold_first and i == 0:
            p.font.bold = True
    return txBox

def add_teal_bar(slide):
    add_shape_bg(slide, Inches(0), Inches(7.1), Inches(13.333), Inches(0.4), TEAL)

def add_slide_number(slide, num):
    add_text_box(slide, Inches(12.5), Inches(7.15), Inches(0.7), Inches(0.3),
                 str(num), font_size=11, color=WHITE, alignment=PP_ALIGN.RIGHT)

# ============================================================
# SLIDE 1: Title Slide
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])  # blank
add_bg(slide, TEAL)

add_text_box(slide, Inches(1), Inches(1.2), Inches(11), Inches(1.5),
             "SMAC", font_size=72, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER, font_name="Calibri")

add_text_box(slide, Inches(1), Inches(2.7), Inches(11), Inches(0.6),
             "Connect.  Learn.  Earn.", font_size=32, bold=False, color=WHITE, alignment=PP_ALIGN.CENTER)

# Divider line
shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(5), Inches(3.5), Inches(3.333), Inches(0.03))
shape.fill.solid()
shape.fill.fore_color.rgb = WHITE
shape.line.fill.background()

add_text_box(slide, Inches(1), Inches(3.8), Inches(11), Inches(0.6),
             "A Social Commerce & E-Learning Super App", font_size=24, color=WHITE, alignment=PP_ALIGN.CENTER)

add_text_box(slide, Inches(1), Inches(5.2), Inches(11), Inches(1.2),
             "ZNZ Technologies  |  smacltd.com  |  Lahore, Pakistan",
             font_size=16, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 2: The Problem
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 2)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "The Problem", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.2), Inches(11), Inches(0.6),
             "Users are juggling too many platforms to socialize, learn, sell, and communicate.",
             font_size=20, color=GREY)

# Problem boxes
problems = [
    ("To Socialize", "Facebook, Instagram,\nLinkedIn"),
    ("To Learn", "Udemy, Coursera,\nSkillshare"),
    ("To Sell Products", "Daraz, OLX,\nEtsy"),
    ("To Offer Services", "Fiverr, Upwork"),
    ("To Communicate", "WhatsApp,\nMessenger"),
]

for i, (title, desc) in enumerate(problems):
    x = Inches(0.8 + i * 2.45)
    box = add_shape_bg(slide, x, Inches(2.2), Inches(2.2), Inches(1.8), LIGHT_BG)
    add_text_box(slide, x + Inches(0.15), Inches(2.35), Inches(1.9), Inches(0.5),
                 title, font_size=16, bold=True, color=TEAL)
    add_text_box(slide, x + Inches(0.15), Inches(2.85), Inches(1.9), Inches(1.0),
                 desc, font_size=14, color=GREY)

# Pain points
pain_points = [
    "Fragmented experience across 5+ apps",
    "No connection between learning and earning",
    "Freelancers build audience on one platform but sell on another",
    "High platform fees eating into profits (Udemy 37%, Fiverr up to 20%)",
    "No localized solution for Pakistan's growing digital economy",
]
add_text_box(slide, Inches(0.8), Inches(4.3), Inches(11), Inches(0.5),
             "The Pain Points:", font_size=20, bold=True, color=BLACK)

for i, point in enumerate(pain_points):
    add_text_box(slide, Inches(1.1), Inches(4.85 + i * 0.4), Inches(10), Inches(0.4),
                 f"\u2022  {point}", font_size=16, color=BLACK)

# ============================================================
# SLIDE 3: The Solution
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 3)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "The Solution: SMAC", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.2), Inches(11), Inches(0.5),
             "One Platform. Six Capabilities. Infinite Possibilities.", font_size=20, color=GREY)

# 6 capability boxes in 2 rows of 3
capabilities = [
    ("Social Networking", "Posts, Stories, Likes,\nComments, Follow System", "Like Facebook/Instagram"),
    ("Product Marketplace", "Buy & Sell Physical\n& Digital Products", "Like Etsy/Daraz"),
    ("Course Platform", "Create, Sell & Enroll\nin Online Courses", "Like Udemy"),
    ("Services Marketplace", "List & Purchase\nProfessional Services", "Like Fiverr/Upwork"),
    ("Real-Time Messaging", "1-on-1 Chat + Refund\nSupport Chat", "Like WhatsApp"),
    ("Admin Dashboard", "Full Platform\nManagement & Analytics", "Complete Control"),
]

for i, (title, desc, comp) in enumerate(capabilities):
    col = i % 3
    row = i // 3
    x = Inches(0.8 + col * 4.0)
    y = Inches(2.0 + row * 2.4)

    box = add_shape_bg(slide, x, y, Inches(3.7), Inches(2.1), LIGHT_BG)
    add_text_box(slide, x + Inches(0.2), y + Inches(0.15), Inches(3.3), Inches(0.45),
                 title, font_size=18, bold=True, color=TEAL)
    add_text_box(slide, x + Inches(0.2), y + Inches(0.65), Inches(3.3), Inches(0.8),
                 desc, font_size=14, color=BLACK)
    add_text_box(slide, x + Inches(0.2), y + Inches(1.55), Inches(3.3), Inches(0.4),
                 comp, font_size=12, bold=True, color=GREY)

# ============================================================
# SLIDE 4: How It Works
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 4)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "How It Works", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "From Sign-Up to First Sale in 4 Steps", font_size=20, color=GREY)

steps = [
    ("1", "SIGN UP", "Email/Password or\nGoogle OAuth\nEmail Verification\nChoose Interests"),
    ("2", "BUILD PRESENCE", "Create your profile\nPost content to feed\nFollow other users\nGrow your audience"),
    ("3", "LIST & SELL", "Create a course/product/service\nSet your pricing\nBuyers purchase in-app\nReal-time chat support"),
    ("4", "EARN & GROW", "Track revenue in dashboard\nRequest withdrawals\nManage refunds\nUpgrade subscription"),
]

for i, (num, title, desc) in enumerate(steps):
    x = Inches(0.6 + i * 3.15)
    # Number circle
    circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, x + Inches(1.05), Inches(1.9), Inches(0.7), Inches(0.7))
    circle.fill.solid()
    circle.fill.fore_color.rgb = TEAL
    circle.line.fill.background()
    tf = circle.text_frame
    tf.paragraphs[0].text = num
    tf.paragraphs[0].font.size = Pt(28)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = WHITE
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER

    # Arrow between steps
    if i < 3:
        arrow = slide.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, x + Inches(2.85), Inches(2.05), Inches(0.4), Inches(0.4))
        arrow.fill.solid()
        arrow.fill.fore_color.rgb = TEAL
        arrow.line.fill.background()

    # Box
    box = add_shape_bg(slide, x, Inches(2.8), Inches(2.8), Inches(3.5), LIGHT_BG)
    add_text_box(slide, x + Inches(0.15), Inches(2.95), Inches(2.5), Inches(0.5),
                 title, font_size=18, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x + Inches(0.2), Inches(3.55), Inches(2.4), Inches(2.5),
                 desc, font_size=15, color=BLACK)

# ============================================================
# SLIDE 5: Social Feed
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 5)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Social Feed", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(5), Inches(0.5),
             "The Heart of the Platform", font_size=20, color=GREY)

features_left = [
    "\u2022  Masonry grid layout (3/2/1 columns responsive)",
    "\u2022  Infinite scroll pagination (6 posts per batch)",
    "\u2022  Instagram-style stories with auto-progress",
    "\u2022  Like with randomized heart colors",
    "\u2022  Comment modal with real-time updates",
    "\u2022  Follow/Unfollow directly from post menu",
    "\u2022  Interest-based personalization for new users",
    "\u2022  Explore tab for category-based discovery",
    "\u2022  Post creation: text + images + hashtags",
    "\u2022  Single post page with related content",
]

for i, feat in enumerate(features_left):
    add_text_box(slide, Inches(0.8), Inches(1.8 + i * 0.45), Inches(6), Inches(0.45),
                 feat, font_size=15, color=BLACK)

# Right side - visual mockup box
box = add_shape_bg(slide, Inches(7.5), Inches(1.5), Inches(5.2), Inches(5.2), LIGHT_BG)
add_text_box(slide, Inches(7.7), Inches(1.7), Inches(4.8), Inches(0.4),
             "[Stories Bar: +Add | You | User1 | User2 | > ]", font_size=12, color=GREY, alignment=PP_ALIGN.CENTER)
add_text_box(slide, Inches(7.7), Inches(2.2), Inches(4.8), Inches(0.3),
             "[For You]     [Explore]", font_size=14, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)

# Mock post cards
for row in range(3):
    for col in range(3):
        px = Inches(7.8 + col * 1.55)
        py = Inches(2.7 + row * 1.5)
        h = Inches(1.3) if (row + col) % 2 == 0 else Inches(1.0)
        card = add_shape_bg(slide, px, py, Inches(1.4), h, WHITE)
        add_text_box(slide, px + Inches(0.1), py + Inches(0.1), Inches(1.2), Inches(0.3),
                     f"Post {row*3+col+1}", font_size=10, color=GREY, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 6: Three Marketplaces
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 6)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Three Vertical Marketplaces", font_size=40, bold=True, color=TEAL)

markets = [
    ("Products", "Like Etsy/Daraz",
     ["Product listing with images", "Category & sub-category filtering",
      "Search by name & category", "Seller profiles + message button",
      "Featured badges on cards", "Price display (PKR with 'k' format)"]),
    ("Courses", "Like Udemy",
     ["Course scheduling (mode, duration, days)", "In-app purchase with payment modal",
      "Instructor profiles linked", "Duration & class time badges",
      "Online/Onsite mode selection", "Applicant tracking for instructors"]),
    ("Services", "Like Fiverr",
     ["Professional service listings", "In-app purchase flow",
      "Seller info + direct messaging", "Simplified creation (3 fields)",
      "Refund request system", "Category-based browsing"]),
]

for i, (title, subtitle, features) in enumerate(markets):
    x = Inches(0.6 + i * 4.1)
    box = add_shape_bg(slide, x, Inches(1.4), Inches(3.8), Inches(5.3), LIGHT_BG)
    add_text_box(slide, x + Inches(0.2), Inches(1.55), Inches(3.4), Inches(0.5),
                 title, font_size=24, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x + Inches(0.2), Inches(2.05), Inches(3.4), Inches(0.4),
                 subtitle, font_size=14, color=GREY, alignment=PP_ALIGN.CENTER)

    for j, feat in enumerate(features):
        add_text_box(slide, x + Inches(0.3), Inches(2.6 + j * 0.55), Inches(3.2), Inches(0.5),
                     f"\u2713  {feat}", font_size=14, color=BLACK)

# Shared features bar at bottom
shared_bar = add_shape_bg(slide, Inches(0.6), Inches(6.75), Inches(12.1), Inches(0.3), TEAL)
add_text_box(slide, Inches(0.8), Inches(6.75), Inches(11.7), Inches(0.3),
             "All share: 2-tier categories  |  4-step creation wizard  |  Up to 10 images  |  Admin dashboard management",
             font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 7: Creation Wizard
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 7)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "4-Step Guided Creation Wizard", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "Intuitive content creation for products, courses & services", font_size=20, color=GREY)

wizard_steps = [
    ("Step 1", "Select Categories", "Choose parent category\nfrom admin-managed\ntaxonomy\n\nSelect sub-categories\n(multi-select cards\nwith teal borders)"),
    ("Step 2", "Upload Images", "Drag & drop zone\nor click to browse\n\nMax 10 images\nPNG/JPG/WEBP/SVG\n\nThumbnail previews\nwith delete option"),
    ("Step 3", "Enter Details", "Title (3-100 chars)\nPrice/Fee\nDescription (1000 chars)\n\nCourses also include:\nMode, Duration,\nClass Days, Class Time"),
    ("Step 4", "Review & Submit", "Full preview of:\n- All uploaded images\n- Title & pricing\n- Description\n- Categories\n\nOne-click submit\nInstant dashboard update"),
]

for i, (step, title, desc) in enumerate(wizard_steps):
    x = Inches(0.6 + i * 3.15)
    # Step header
    header = add_shape_bg(slide, x, Inches(1.8), Inches(2.9), Inches(0.5), TEAL)
    add_text_box(slide, x, Inches(1.8), Inches(2.9), Inches(0.5),
                 f"{step}: {title}", font_size=16, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    # Content box
    box = add_shape_bg(slide, x, Inches(2.3), Inches(2.9), Inches(4.2), LIGHT_BG)
    add_text_box(slide, x + Inches(0.2), Inches(2.5), Inches(2.5), Inches(3.8),
                 desc, font_size=14, color=BLACK)

    # Progress dots
    for dot in range(4):
        d = slide.shapes.add_shape(MSO_SHAPE.OVAL,
                                    x + Inches(0.75 + dot * 0.45), Inches(6.65),
                                    Inches(0.2), Inches(0.2))
        d.fill.solid()
        d.fill.fore_color.rgb = TEAL if dot <= i else GREY
        d.line.fill.background()

# ============================================================
# SLIDE 8: Real-Time Chat
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 8)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Real-Time Messaging", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "Two chat systems powered by Socket.IO", font_size=20, color=GREY)

# Left - Regular Chat
box1 = add_shape_bg(slide, Inches(0.6), Inches(1.8), Inches(5.8), Inches(4.8), LIGHT_BG)
add_text_box(slide, Inches(0.8), Inches(1.9), Inches(5.4), Inches(0.5),
             "Regular Chat (1-on-1 DMs)", font_size=20, bold=True, color=TEAL)
chat_features = [
    "\u2022  Conversation list with unread indicators",
    "\u2022  Real-time message delivery via WebSocket",
    "\u2022  Emoji picker integration",
    "\u2022  Compose new message to any user",
    "\u2022  Quick message from profile/product pages",
    "\u2022  Auto-scroll to latest message",
    "\u2022  Date dividers between message groups",
    "\u2022  Mobile: full-screen chat with back button",
]
for i, f in enumerate(chat_features):
    add_text_box(slide, Inches(0.9), Inches(2.5 + i * 0.4), Inches(5.3), Inches(0.4),
                 f, font_size=14, color=BLACK)

# Right - Refund Chat
box2 = add_shape_bg(slide, Inches(6.9), Inches(1.8), Inches(5.8), Inches(4.8), LIGHT_BG)
add_text_box(slide, Inches(7.1), Inches(1.9), Inches(5.4), Inches(0.5),
             "Refund Support Chat", font_size=20, bold=True, color=TEAL)
refund_features = [
    "\u2022  Embedded in refund ticket pages",
    "\u2022  Three-way: buyer + seller + admin",
    "\u2022  Image attachment support",
    "\u2022  Full-screen image preview",
    "\u2022  Auto-disabled when ticket resolved",
    "\u2022  Real-time via Socket.IO events",
    "\u2022  Message history loaded from REST API",
    "\u2022  Ticket status tracking (Pending/Done)",
]
for i, f in enumerate(refund_features):
    add_text_box(slide, Inches(7.2), Inches(2.5 + i * 0.4), Inches(5.3), Inches(0.4),
                 f, font_size=14, color=BLACK)

# Socket.IO bar
sock_bar = add_shape_bg(slide, Inches(0.6), Inches(6.7), Inches(12.1), Inches(0.35), DARK_TEAL)
add_text_box(slide, Inches(0.8), Inches(6.7), Inches(11.7), Inches(0.35),
             "Socket.IO  |  WebSocket Transport  |  JWT Auth  |  Auto-Reconnect  |  Redux Middleware Bridge",
             font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 9: Dashboards
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 9)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Comprehensive Dashboards", font_size=40, bold=True, color=TEAL)

# User Dashboard
add_text_box(slide, Inches(0.8), Inches(1.3), Inches(5.5), Inches(0.5),
             "User Dashboard (6 Tabs)", font_size=22, bold=True, color=DARK_TEAL)

user_tabs = [
    ("Courses", "My Courses (CRUD) + Purchased (refund)"),
    ("Services", "My Services (CRUD) + Purchased (refund)"),
    ("Market", "My Products (CRUD + view modal)"),
    ("Subscriptions", "Current plan + payment history"),
    ("Payment", "4 summary cards + withdrawal requests"),
    ("Refunds", "Buyer tickets + seller tickets + chat"),
]

for i, (tab, desc) in enumerate(user_tabs):
    y = Inches(1.9 + i * 0.55)
    tag = add_shape_bg(slide, Inches(0.8), y, Inches(1.6), Inches(0.4), TEAL)
    add_text_box(slide, Inches(0.85), y, Inches(1.5), Inches(0.4),
                 tab, font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, Inches(2.6), y, Inches(4), Inches(0.4),
                 desc, font_size=13, color=BLACK)

# Admin Dashboard
add_text_box(slide, Inches(7.0), Inches(1.3), Inches(5.5), Inches(0.5),
             "Admin Dashboard (8 Tabs)", font_size=22, bold=True, color=DARK_TEAL)

admin_tabs = [
    ("Users", "View / Search / Block / Unblock"),
    ("Courses", "View / Search / Delete courses"),
    ("Markets", "View / Search / Delete products"),
    ("Payments", "View all transactions (read-only)"),
    ("Withdrawals", "View / Approve with txn reference"),
    ("Refunds", "View / Approve / Reject + chat"),
    ("Categories", "CRUD: 4 modules x 2 tiers + tags"),
    ("Subscriptions", "Create / Edit plans + pricing"),
]

for i, (tab, desc) in enumerate(admin_tabs):
    y = Inches(1.9 + i * 0.55)
    tag = add_shape_bg(slide, Inches(7.0), y, Inches(1.6), Inches(0.4), DARK_TEAL)
    add_text_box(slide, Inches(7.05), y, Inches(1.5), Inches(0.4),
                 tab, font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, Inches(8.8), y, Inches(4), Inches(0.4),
                 desc, font_size=13, color=BLACK)

# Bottom note
add_text_box(slide, Inches(0.8), Inches(6.3), Inches(12), Inches(0.5),
             "Every tab follows the same pattern:  Fetch data on load  \u2192  Display in searchable table  \u2192  Actions via dropdowns/modals  \u2192  API calls  \u2192  Refresh",
             font_size=14, bold=True, color=GREY, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 10: Revenue Model
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 10)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Revenue Model", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "Multiple Revenue Streams", font_size=20, color=GREY)

# Subscription plans
plans = [
    ("STARTER", "$2.99/mo", "$15.99/yr", "2 Courses\n2 Products\n2 Services"),
    ("BUSINESS", "$3.99/mo", "$24.99/yr", "5 Courses\n5 Products\n5 Services"),
    ("SCALE-UP", "$4.99/mo", "$36.99/yr", "8 Courses\n8 Products\n8 Services"),
]

for i, (name, monthly, yearly, limits) in enumerate(plans):
    x = Inches(0.8 + i * 3.0)
    box = add_shape_bg(slide, x, Inches(1.8), Inches(2.7), Inches(3.5), LIGHT_BG)
    # Plan name
    header = add_shape_bg(slide, x, Inches(1.8), Inches(2.7), Inches(0.55), TEAL if i != 1 else DARK_TEAL)
    add_text_box(slide, x, Inches(1.82), Inches(2.7), Inches(0.5),
                 name, font_size=18, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x, Inches(2.5), Inches(2.7), Inches(0.5),
                 monthly, font_size=28, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x, Inches(3.0), Inches(2.7), Inches(0.3),
                 yearly, font_size=14, color=GREY, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x + Inches(0.3), Inches(3.5), Inches(2.1), Inches(1.5),
                 limits, font_size=15, color=BLACK, alignment=PP_ALIGN.CENTER)

# Transaction Fee
fee_box = add_shape_bg(slide, Inches(9.8), Inches(1.8), Inches(3.0), Inches(1.5), TEAL)
add_text_box(slide, Inches(9.8), Inches(1.95), Inches(3.0), Inches(0.4),
             "TRANSACTION FEE", font_size=16, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
add_text_box(slide, Inches(9.8), Inches(2.4), Inches(3.0), Inches(0.6),
             "5%", font_size=48, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# Future Revenue
add_text_box(slide, Inches(9.8), Inches(3.5), Inches(3.0), Inches(0.4),
             "on every service sale", font_size=13, color=GREY, alignment=PP_ALIGN.CENTER)

future_box = add_shape_bg(slide, Inches(9.8), Inches(4.1), Inches(3.0), Inches(1.2), LIGHT_BG)
add_text_box(slide, Inches(10.0), Inches(4.15), Inches(2.6), Inches(0.35),
             "Future Revenue Streams", font_size=14, bold=True, color=DARK_TEAL)
add_text_box(slide, Inches(10.0), Inches(4.55), Inches(2.6), Inches(0.7),
             "\u2022 Featured listings\n\u2022 Premium messaging\n\u2022 Enterprise licensing",
             font_size=13, color=BLACK)

# Fee comparison
add_text_box(slide, Inches(0.8), Inches(5.6), Inches(12), Inches(0.5),
             "Fee Comparison:   SMAC 5%   vs   Udemy 37%   vs   Fiverr 5.5-20%   vs   Upwork 5-20%",
             font_size=18, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)

# PKR pricing
add_text_box(slide, Inches(0.8), Inches(6.2), Inches(12), Inches(0.5),
             "Local PKR Pricing:  Basic PKR 300  |  Regular PKR 500  |  Enterprise PKR 1,000",
             font_size=16, color=GREY, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 11: Authentication & Security
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 11)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Authentication & Security", font_size=40, bold=True, color=TEAL)

# Left column
add_text_box(slide, Inches(0.8), Inches(1.3), Inches(5.5), Inches(0.5),
             "Authentication Methods", font_size=20, bold=True, color=DARK_TEAL)

auth_items = [
    "\u2713  Email + Password sign-in/sign-up",
    "\u2713  Google OAuth 2.0 (one-click)",
    "\u2713  JWT token-based sessions",
    "\u2713  Email verification for activation",
    "\u2713  Forgot / Reset password via email link",
    "\u2713  Auto-logout on expired tokens (401)",
    "\u2713  Token persisted via Redux Persist",
    "\u2713  Socket.IO authenticated with JWT",
]
for i, item in enumerate(auth_items):
    add_text_box(slide, Inches(0.8), Inches(1.9 + i * 0.45), Inches(5.5), Inches(0.4),
                 item, font_size=15, color=BLACK)

# Right column
add_text_box(slide, Inches(7.0), Inches(1.3), Inches(5.5), Inches(0.5),
             "Route Protection", font_size=20, bold=True, color=DARK_TEAL)

route_items = [
    ("Public", "/signin, /signup, /about-us, /blogs", "\u2022 Anyone can access"),
    ("Authenticated", "/feed, /messaging, /courses, /market", "\u2022 Login required"),
    ("Admin Only", "/admin/dashboard", "\u2022 Admin role required"),
]
for i, (level, routes, note) in enumerate(route_items):
    y = Inches(1.9 + i * 1.3)
    tag = add_shape_bg(slide, Inches(7.0), y, Inches(1.8), Inches(0.4),
                        TEAL if level != "Admin Only" else RED)
    add_text_box(slide, Inches(7.05), y, Inches(1.7), Inches(0.4),
                 level, font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, Inches(9.0), y, Inches(4), Inches(0.4),
                 routes, font_size=12, color=GREY)
    add_text_box(slide, Inches(9.0), y + Inches(0.35), Inches(4), Inches(0.3),
                 note, font_size=12, color=BLACK)

# Password rules box
add_text_box(slide, Inches(7.0), Inches(5.3), Inches(5.5), Inches(0.4),
             "Password Security Rules", font_size=18, bold=True, color=DARK_TEAL)
add_text_box(slide, Inches(7.0), Inches(5.75), Inches(5.5), Inches(0.9),
             "8-16 characters | Uppercase letter required\nNumber required | Special character (!@#$%^&*.) required\nConfirm password matching on reset & change",
             font_size=14, color=BLACK)

# ============================================================
# SLIDE 12: Tech Architecture
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 12)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Technology Architecture", font_size=40, bold=True, color=TEAL)

# Architecture boxes
arch_items = [
    (Inches(0.5), Inches(1.5), "React 18 SPA", "Functional components\n& hooks architecture"),
    (Inches(3.5), Inches(1.5), "Redux Toolkit", "21 domain-separated\nstate slices"),
    (Inches(6.5), Inches(1.5), "Material UI v5", "Custom theme with\n30+ typography variants"),
    (Inches(9.5), Inches(1.5), "Socket.IO", "WebSocket transport\nwith auto-reconnect"),
    (Inches(0.5), Inches(3.3), "Axios", "Centralized API layer\nvia useFetch hook"),
    (Inches(3.5), Inches(3.3), "JWT + Google OAuth", "Token-based auth\nwith Redux Persist"),
    (Inches(6.5), Inches(3.3), "Formik + Yup", "Form handling with\nschema validation"),
    (Inches(9.5), Inches(3.3), "React Router v6", "Protected routing\nwith role-based access"),
]

for x, y, title, desc in arch_items:
    box = add_shape_bg(slide, x, y, Inches(2.7), Inches(1.5), LIGHT_BG)
    add_text_box(slide, x + Inches(0.15), y + Inches(0.1), Inches(2.4), Inches(0.4),
                 title, font_size=16, bold=True, color=TEAL)
    add_text_box(slide, x + Inches(0.15), y + Inches(0.55), Inches(2.4), Inches(0.8),
                 desc, font_size=13, color=BLACK)

# Stats bar
stats_bar = add_shape_bg(slide, Inches(0.5), Inches(5.2), Inches(12.3), Inches(1.5), DARK_TEAL)
stats = [
    ("100+", "React\nComponents"),
    ("21", "Redux\nSlices"),
    ("50+", "API\nEndpoints"),
    ("9", "Custom\nHooks"),
    ("30+", "Typography\nVariants"),
    ("5", "Responsive\nBreakpoints"),
]
for i, (num, label) in enumerate(stats):
    x = Inches(0.7 + i * 2.05)
    add_text_box(slide, x, Inches(5.35), Inches(1.8), Inches(0.5),
                 num, font_size=36, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x, Inches(5.9), Inches(1.8), Inches(0.6),
                 label, font_size=13, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 13: Global Search
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 13)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Unified Global Search", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "One Search. Five Result Types. Single API Call.", font_size=20, color=GREY)

# Flow visualization
flow_items = [
    (Inches(4.5), Inches(1.9), Inches(4.3), Inches(0.5), 'User types "react" + presses Enter', LIGHT_BG, BLACK),
    (Inches(4.5), Inches(2.6), Inches(4.3), Inches(0.5), 'GET /api/search?searchQuery=react', TEAL, WHITE),
    (Inches(4.5), Inches(3.3), Inches(4.3), Inches(0.5), 'Server returns 5 result sets', LIGHT_BG, BLACK),
    (Inches(4.5), Inches(4.0), Inches(4.3), Inches(0.5), '6 Redux dispatches at once', TEAL, WHITE),
]
for x, y, w, h, text, bg, fg in flow_items:
    box = add_shape_bg(slide, x, y, w, h, bg)
    add_text_box(slide, x, y + Inches(0.05), w, Inches(0.4),
                 text, font_size=14, bold=True, color=fg, alignment=PP_ALIGN.CENTER)

# Arrow connectors
for i in range(3):
    arrow = slide.shapes.add_shape(MSO_SHAPE.DOWN_ARROW,
                                     Inches(6.5), Inches(2.45 + i * 0.7), Inches(0.3), Inches(0.2))
    arrow.fill.solid()
    arrow.fill.fore_color.rgb = TEAL
    arrow.line.fill.background()

# 5 result tabs
tabs = ["People", "Posts", "Products", "Courses", "Services"]
for i, tab in enumerate(tabs):
    x = Inches(1.6 + i * 2.1)
    box = add_shape_bg(slide, x, Inches(4.8), Inches(1.9), Inches(0.5), TEAL)
    add_text_box(slide, x, Inches(4.8), Inches(1.9), Inches(0.5),
                 tab, font_size=15, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# Key insight
add_shape_bg(slide, Inches(1.0), Inches(5.7), Inches(11.3), Inches(0.9), LIGHT_BG)
add_text_box(slide, Inches(1.2), Inches(5.8), Inches(10.9), Inches(0.7),
             "Key: No additional API calls when switching tabs.\n"
             "All 5 result sets are fetched in a single request and stored in Redux globalSearch slice.\n"
             "This gives users instant tab-switching while minimizing server load.",
             font_size=14, color=BLACK, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 14: Market Opportunity
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 14)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Market Opportunity", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.5),
             "Pakistan's Digital Economy is at an Inflection Point", font_size=20, color=GREY)

# Market stats
market_stats = [
    ("$7.6B+", "E-Commerce Market", "Growing 25%+ YoY"),
    ("#2", "Global Freelance\nWorkforce", "On platforms like Fiverr"),
    ("120M+", "Internet Users", "And rapidly growing"),
    ("60%", "Youth Population", "Under 30 years old"),
]

for i, (num, label, sub) in enumerate(market_stats):
    x = Inches(0.6 + i * 3.15)
    box = add_shape_bg(slide, x, Inches(1.8), Inches(2.9), Inches(2.2), TEAL if i % 2 == 0 else DARK_TEAL)
    add_text_box(slide, x, Inches(1.95), Inches(2.9), Inches(0.7),
                 num, font_size=40, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x, Inches(2.65), Inches(2.9), Inches(0.6),
                 label, font_size=16, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x, Inches(3.35), Inches(2.9), Inches(0.4),
                 sub, font_size=13, color=WHITE, alignment=PP_ALIGN.CENTER)

# The gap
add_text_box(slide, Inches(0.8), Inches(4.3), Inches(12), Inches(0.5),
             "The Gap SMAC Fills:", font_size=20, bold=True, color=DARK_TEAL)

gaps = [
    "No local platform combining social + commerce + education",
    "International platforms have high fees (Udemy 37%, Fiverr 20%) and no social layer",
    "Local alternatives (Daraz, OLX) are commerce-only -- no community",
    "Freelancers need a localized ecosystem with PKR support",
]
for i, gap in enumerate(gaps):
    add_text_box(slide, Inches(1.1), Inches(4.9 + i * 0.42), Inches(11), Inches(0.4),
                 f"\u2022  {gap}", font_size=15, color=BLACK)

# ============================================================
# SLIDE 15: Competitive Landscape
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 15)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Competitive Landscape", font_size=40, bold=True, color=TEAL)

# Table header
headers = ["Feature", "SMAC", "Facebook", "Udemy", "Fiverr", "Daraz"]
col_widths = [Inches(2.2), Inches(1.5), Inches(1.5), Inches(1.5), Inches(1.5), Inches(1.5)]
start_x = Inches(1.3)

for i, (header, width) in enumerate(zip(headers, col_widths)):
    x = start_x + sum(w for w in [Inches(0)] + list(col_widths[:i]))
    box = add_shape_bg(slide, x, Inches(1.2), width, Inches(0.45), DARK_TEAL)
    add_text_box(slide, x, Inches(1.22), width, Inches(0.4),
                 header, font_size=13, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# Table rows
rows = [
    ["Social Feed",      "YES", "YES", "NO",  "NO",  "NO"],
    ["Stories",          "YES", "YES", "NO",  "NO",  "NO"],
    ["Product Market",   "YES", "Mktpl","NO", "NO",  "YES"],
    ["Course Platform",  "YES", "NO",  "YES", "NO",  "NO"],
    ["Service Market",   "YES", "NO",  "NO",  "YES", "NO"],
    ["Real-time Chat",   "YES", "Msgr", "NO", "YES", "NO"],
    ["Refund System",    "YES", "NO",  "YES", "YES", "YES"],
    ["Admin Dashboard",  "YES", "NO",  "NO",  "NO",  "NO"],
    ["PKR Native",       "YES", "NO",  "NO",  "NO",  "YES"],
    ["Low Fees (5%)",    "YES", "NO",  "37%", "20%", "Var"],
]

for r, row in enumerate(rows):
    y = Inches(1.65 + r * 0.42)
    bg_color = LIGHT_BG if r % 2 == 0 else WHITE
    for c, (cell, width) in enumerate(zip(row, col_widths)):
        x = start_x + sum(w for w in [Inches(0)] + list(col_widths[:c]))
        cell_bg = bg_color
        if c == 1:  # SMAC column
            if cell == "YES":
                cell_bg = RGBColor(0xE0, 0xF7, 0xF4)
        box = add_shape_bg(slide, x, y, width, Inches(0.42), cell_bg)
        font_color = GREEN if cell == "YES" else (RED if cell in ["NO", "37%", "20%"] else BLACK)
        if c == 0:
            font_color = BLACK
        add_text_box(slide, x, y + Inches(0.05), width, Inches(0.35),
                     cell, font_size=12, bold=(c <= 1), color=font_color, alignment=PP_ALIGN.CENTER)

# Bottom note
add_shape_bg(slide, Inches(1.3), Inches(5.95), Inches(9.7), Inches(0.5), TEAL)
add_text_box(slide, Inches(1.3), Inches(5.97), Inches(9.7), Inches(0.45),
             "No competitor offers ALL six capabilities in one platform.",
             font_size=16, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 16: What's Built
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 16)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Platform Status", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.05), Inches(11), Inches(0.5),
             "This is not a pitch for an idea. It's a working product.", font_size=20, bold=True, color=DARK_TEAL)

features_status = [
    ("Authentication", "100%", "Email + Google OAuth + verification + reset"),
    ("Social Feed", "95%", "Infinite scroll, stories, likes, comments, follow"),
    ("Product Marketplace", "100%", "Full CRUD + categories + search + filtering"),
    ("Course Platform", "100%", "Creation + purchase + scheduling + refunds"),
    ("Services Marketplace", "100%", "Creation + purchase + refunds"),
    ("Real-time Chat", "85%", "1-on-1 DMs + refund chat (group chat planned)"),
    ("Dashboards", "100%", "Admin (8 tabs) + User (6 tabs) fully functional"),
    ("Payments", "100%", "Subscriptions + withdrawals + refund system"),
    ("Global Search", "100%", "Unified search across 5 content types"),
    ("Landing Page", "100%", "10-section marketing page + About + Blogs + Privacy"),
]

for i, (feature, pct, desc) in enumerate(features_status):
    y = Inches(1.7 + i * 0.5)
    # Feature name
    add_text_box(slide, Inches(0.8), y, Inches(2.5), Inches(0.4),
                 feature, font_size=14, bold=True, color=BLACK)
    # Progress bar background
    bar_bg = add_shape_bg(slide, Inches(3.5), y + Inches(0.08), Inches(2.0), Inches(0.25), LIGHT_BG)
    # Progress bar fill
    pct_val = int(pct.replace('%', '')) / 100
    bar_fill = add_shape_bg(slide, Inches(3.5), y + Inches(0.08), Inches(2.0 * pct_val), Inches(0.25),
                             GREEN if pct_val == 1.0 else TEAL)
    # Percentage
    add_text_box(slide, Inches(5.6), y, Inches(0.6), Inches(0.4),
                 pct, font_size=13, bold=True, color=GREEN if pct_val == 1.0 else TEAL)
    # Description
    add_text_box(slide, Inches(6.3), y, Inches(6.5), Inches(0.4),
                 desc, font_size=13, color=GREY)

# ============================================================
# SLIDE 17: Growth Roadmap
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 17)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Growth Roadmap", font_size=40, bold=True, color=TEAL)

phases = [
    ("Phase 1: NOW", "Built & Ready", TEAL,
     ["Full platform with 6 core capabilities",
      "Admin-managed marketplace",
      "Subscription monetization",
      "Real-time messaging & notifications",
      "Complete auth system",
      "Responsive web application"]),
    ("Phase 2: NEXT 6 MONTHS", "Scale & Enhance", DARK_TEAL,
     ["Mobile app (React Native)",
      "Group chats + typing indicators",
      "Voice/video calls",
      "Seller analytics dashboard",
      "Featured/promoted listings",
      "AI-powered recommendations"]),
    ("Phase 3: 12+ MONTHS", "Expand & Dominate", BLACK,
     ["White-label enterprise solution",
      "Multi-language (Urdu, Arabic)",
      "JazzCash + EasyPaisa integration",
      "Course certification system",
      "Affiliate/referral program",
      "API marketplace for integrations"]),
]

for i, (title, subtitle, color, items) in enumerate(phases):
    x = Inches(0.6 + i * 4.1)
    # Header
    header = add_shape_bg(slide, x, Inches(1.3), Inches(3.8), Inches(0.9), color)
    add_text_box(slide, x + Inches(0.15), Inches(1.35), Inches(3.5), Inches(0.45),
                 title, font_size=18, bold=True, color=WHITE)
    add_text_box(slide, x + Inches(0.15), Inches(1.75), Inches(3.5), Inches(0.35),
                 subtitle, font_size=14, color=WHITE)

    # Items
    box = add_shape_bg(slide, x, Inches(2.2), Inches(3.8), Inches(4.3), LIGHT_BG)
    for j, item in enumerate(items):
        add_text_box(slide, x + Inches(0.2), Inches(2.4 + j * 0.6), Inches(3.4), Inches(0.5),
                     f"\u2713  {item}", font_size=14, color=BLACK)

# ============================================================
# SLIDE 18: The Ask
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 18)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "The Ask", font_size=40, bold=True, color=TEAL)

add_text_box(slide, Inches(0.8), Inches(1.1), Inches(11), Inches(0.6),
             "Seeking Seed / Pre-Series A Investment", font_size=22, bold=True, color=DARK_TEAL, alignment=PP_ALIGN.CENTER)

# Fund allocation
allocations = [
    ("40%", "Engineering & Product", "Mobile app development\nBackend scaling\nAI/ML recommendations", TEAL),
    ("25%", "Marketing & Acquisition", "Digital marketing campaigns\nInfluencer partnerships\nUniversity campus programs", DARK_TEAL),
    ("20%", "Operations & Infra", "Server infrastructure\nPayment gateway integration\nCustomer support team", TEAL),
    ("15%", "Team Expansion", "Senior developers\nBusiness development\nCommunity managers", DARK_TEAL),
]

for i, (pct, title, desc, color) in enumerate(allocations):
    x = Inches(0.6 + i * 3.15)
    # Percentage circle
    circle = slide.shapes.add_shape(MSO_SHAPE.OVAL, x + Inches(0.85), Inches(2.0), Inches(1.1), Inches(1.1))
    circle.fill.solid()
    circle.fill.fore_color.rgb = color
    circle.line.fill.background()
    tf = circle.text_frame
    tf.paragraphs[0].text = pct
    tf.paragraphs[0].font.size = Pt(28)
    tf.paragraphs[0].font.bold = True
    tf.paragraphs[0].font.color.rgb = WHITE
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER

    # Box
    box = add_shape_bg(slide, x, Inches(3.3), Inches(2.9), Inches(2.8), LIGHT_BG)
    add_text_box(slide, x + Inches(0.15), Inches(3.4), Inches(2.6), Inches(0.5),
                 title, font_size=16, bold=True, color=color, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x + Inches(0.2), Inches(3.95), Inches(2.5), Inches(1.8),
                 desc, font_size=14, color=BLACK, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 19: Target Users
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, WHITE)
add_teal_bar(slide)
add_slide_number(slide, 19)

add_text_box(slide, Inches(0.8), Inches(0.4), Inches(11), Inches(0.7),
             "Target Users", font_size=40, bold=True, color=TEAL)

personas = [
    ("Freelancers &\nService Providers",
     "Build audience AND sell services\nin one place. Currently scattered\nacross Fiverr + Instagram + WhatsApp.",
     "SMAC saves them from paying\n20% fees on Fiverr"),
    ("Educators &\nCourse Creators",
     "Create and sell courses with\nlocalized PKR pricing. Currently\nusing Udemy (37% fee) or YouTube.",
     "SMAC takes only 5% and\nprovides social discovery"),
    ("Small Businesses &\nProduct Sellers",
     "Reach customers through social\nengagement. Currently using\nDaraz/OLX with no community.",
     "SMAC's social feed drives\norganic product discovery"),
    ("Learners &\nBuyers",
     "Affordable, local courses and\nservices. Currently paying in\nUSD on international platforms.",
     "SMAC offers PKR pricing\nwith localized content"),
]

for i, (title, desc, value) in enumerate(personas):
    x = Inches(0.5 + i * 3.15)
    box = add_shape_bg(slide, x, Inches(1.3), Inches(2.95), Inches(5.3), LIGHT_BG)
    # Icon placeholder
    icon = add_shape_bg(slide, x + Inches(0.85), Inches(1.5), Inches(1.2), Inches(1.2), TEAL)
    add_text_box(slide, x + Inches(0.85), Inches(1.8), Inches(1.2), Inches(0.6),
                 ["F&S", "E&C", "SMB", "L&B"][i], font_size=24, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

    add_text_box(slide, x + Inches(0.1), Inches(2.85), Inches(2.75), Inches(0.7),
                 title, font_size=16, bold=True, color=TEAL, alignment=PP_ALIGN.CENTER)
    add_text_box(slide, x + Inches(0.15), Inches(3.6), Inches(2.65), Inches(1.5),
                 desc, font_size=13, color=BLACK)
    # Value prop
    val_box = add_shape_bg(slide, x + Inches(0.1), Inches(5.3), Inches(2.75), Inches(1.0), TEAL)
    add_text_box(slide, x + Inches(0.2), Inches(5.4), Inches(2.55), Inches(0.8),
                 value, font_size=12, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SLIDE 20: Closing Slide
# ============================================================
slide = prs.slides.add_slide(prs.slide_layouts[6])
add_bg(slide, TEAL)

add_text_box(slide, Inches(1), Inches(0.8), Inches(11), Inches(1.0),
             "Why SMAC? Why Now?", font_size=44, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

reasons = [
    "1.  The Product is BUILT -- not a pitch deck, it's a working platform",
    "2.  The Market is MASSIVE -- 120M+ internet users, $7.6B e-commerce, #2 freelance nation",
    "3.  The Gap is CLEAR -- no competitor combines social + commerce + education",
    "4.  The Model WORKS -- subscriptions + transaction fees = multiple revenue streams",
    "5.  The Team DELIVERS -- full-stack platform built and functional",
]

for i, reason in enumerate(reasons):
    add_text_box(slide, Inches(1.5), Inches(2.2 + i * 0.7), Inches(10), Inches(0.6),
                 reason, font_size=20, color=WHITE)

# Divider
shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(4), Inches(5.8), Inches(5.333), Inches(0.03))
shape.fill.solid()
shape.fill.fore_color.rgb = WHITE
shape.line.fill.background()

add_text_box(slide, Inches(1), Inches(6.0), Inches(11), Inches(0.5),
             '"Connect.  Learn.  Earn."', font_size=28, bold=True, color=WHITE, alignment=PP_ALIGN.CENTER)

add_text_box(slide, Inches(1), Inches(6.6), Inches(11), Inches(0.7),
             "smacltd.com   |   support@smac.com   |   +92-3441932822\n"
             "Facebook  |  LinkedIn  |  Instagram  |  YouTube",
             font_size=14, color=WHITE, alignment=PP_ALIGN.CENTER)

# ============================================================
# SAVE
# ============================================================
output_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "SMAC_Investor_Presentation.pptx")
prs.save(output_path)
print(f"Presentation saved to: {output_path}")
print(f"Total slides: {len(prs.slides)}")
