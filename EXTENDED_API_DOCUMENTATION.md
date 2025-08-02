# PROFESSOR BOT - Extended API Documentation

This document covers advanced features, extra modules, and detailed implementation guides for the PROFESSOR BOT.

## Table of Contents

1. [ExtraMods - Extended Modules](#extramods---extended-modules)
2. [Callback Query System](#callback-query-system)
3. [Image Processing API](#image-processing-api)
4. [Group Management Tools](#group-management-tools)
5. [Advanced Search Features](#advanced-search-features)
6. [File Processing Pipeline](#file-processing-pipeline)
7. [Custom Template System](#custom-template-system)
8. [Performance Monitoring](#performance-monitoring)

## ExtraMods - Extended Modules

The `plugins/ExtraMods/` directory contains specialized functionality modules that extend the bot's capabilities.

### Group Manager (`group_manager.py`)

Advanced group moderation tools for administrators.

#### Ban Management

##### Permanent Ban
```python
@Client.on_message(filters.command("ban"))
async def ban_user(_, message):
```

**Usage:**
```
/ban @username         # Ban by username
/ban user_id          # Ban by user ID
/ban (reply to user)  # Ban by replying to message
```

**Features:**
- Admin permission verification
- User extraction from multiple formats
- Error handling for invalid operations

##### Temporary Ban
```python
@Client.on_message(filters.command("tban"))
async def temp_ban_user(_, message):
```

**Usage:**
```
/tban @username 1h    # Ban for 1 hour
/tban user_id 30m     # Ban for 30 minutes
/tban (reply) 1d      # Ban for 1 day
```

**Time Formats:**
- `m` - Minutes (e.g., 30m)
- `h` - Hours (e.g., 2h)
- `d` - Days (e.g., 7d)

##### Unban/Unmute
```python
@Client.on_message(filters.command(["unban", "unmute"]))
async def un_ban_user(_, message):
```

**Usage:**
```
/unban @username      # Unban user
/unmute user_id       # Unmute user
```

#### Mute Management

##### Permanent Mute
```python
@Client.on_message(filters.command("mute"))
async def mute_user(_, message):
```

**Usage:**
```
/mute @username       # Mute user permanently
/mute (reply)         # Mute by replying
```

##### Temporary Mute
```python
@Client.on_message(filters.command("tmute"))
async def temp_mute_user(_, message):
```

**Usage:**
```
/tmute @username 1h   # Mute for 1 hour
/tmute (reply) 30m    # Mute for 30 minutes
```

#### Kick and Promotion

##### Kick User
```python
@Client.on_message(filters.command("kick"))
async def kick_user(_, message):
```

**Usage:**
```
/kick @username       # Kick user from group
/kick (reply)         # Kick by replying
```

##### Promote User
```python
@Client.on_message(filters.command("promote"))
async def promote_user(_, message):
```

**Usage:**
```
/promote @username    # Promote to admin
/promote (reply)      # Promote by replying
```

**Default Permissions:**
- Can delete messages
- Can ban users
- Can invite users
- Can pin messages

##### Demote User
```python
@Client.on_message(filters.command("demote"))
async def demote_user(_, message):
```

### Telegraph Integration (`telegraph.py`)

Upload content to Telegraph for sharing.

#### Text Upload
```python
@Client.on_message(filters.command("telegraph") & filters.reply)
async def telegraph_text(bot, message):
```

**Usage:**
```
/telegraph            # Reply to text message
```

**Features:**
- Converts text messages to Telegraph pages
- Supports markdown formatting
- Returns shareable link

#### Media Upload
```python
@Client.on_message(filters.command("tgmedia") & filters.reply)
async def telegraph_media(bot, message):
```

**Usage:**
```
/tgmedia              # Reply to photo/video
```

**Supported Formats:**
- Images (JPEG, PNG, GIF)
- Videos (MP4, AVI)
- Documents (PDF, TXT)

### Paste Service (`paste.py`)

Share text content via paste services.

#### Paste Text
```python
@Client.on_message(filters.command("paste") & filters.reply)
async def paste_text(bot, message):
```

**Usage:**
```
/paste                # Reply to text message
```

**Supported Services:**
- Pastebin
- Hastebin
- GitHub Gist
- Custom paste services

### URL Shortening (`share_text.py`)

Shorten URLs for easy sharing.

#### Shorten URL
```python
@Client.on_message(filters.command("short"))
async def shorten_url(bot, message):
```

**Usage:**
```
/short https://example.com/very/long/url
```

**Features:**
- Multiple URL shortener support
- Custom aliases
- Click tracking

### JSON Formatting (`json.py`)

Format and validate JSON data.

#### JSON Formatter
```python
@Client.on_message(filters.command("json") & filters.reply)
async def format_json(bot, message):
```

**Usage:**
```
/json                 # Reply to JSON text
```

**Features:**
- JSON validation
- Pretty formatting
- Error highlighting

### Password Generator (`password.py`)

Generate secure passwords.

#### Generate Password
```python
@Client.on_message(filters.command("genpass"))
async def generate_password(bot, message):
```

**Usage:**
```
/genpass              # Default 12 characters
/genpass 16           # 16 character password
/genpass 8 simple     # 8 characters, simple mode
```

**Options:**
- `simple` - Alphanumeric only
- `complex` - Include special characters
- `secure` - Maximum security

### Font Styling (`font.py`)

Apply various text formatting styles.

#### Style Text
```python
@Client.on_message(filters.command("font") & filters.reply)
async def style_text(bot, message):
```

**Available Styles:**
- Bold
- Italic
- Monospace
- Strikethrough
- Underline
- Fancy fonts
- Unicode transformations

**Usage:**
```
/font bold            # Bold text
/font italic          # Italic text
/font mono            # Monospace
/font fancy1          # Fancy font style 1
```

### TTS (Text-to-Speech) (`tts.py`)

Convert text to speech audio.

#### Generate Audio
```python
@Client.on_message(filters.command("tts") & filters.reply)
async def text_to_speech(bot, message):
```

**Usage:**
```
/tts                  # Default voice (English)
/tts hi               # Hindi voice
/tts en-us            # US English
/tts es               # Spanish
```

**Supported Languages:**
- English (multiple accents)
- Hindi
- Spanish
- French
- German
- And more...

### Carbon Code Screenshots (`carbon.py`)

Generate beautiful code screenshots.

#### Create Carbon
```python
@Client.on_message(filters.command("carbon") & filters.reply)
async def make_carbon_image(bot, message):
```

**Usage:**
```
/carbon               # Default theme
/carbon dark          # Dark theme
/carbon monokai       # Monokai theme
/carbon python        # Python syntax
```

**Features:**
- Multiple themes
- Syntax highlighting
- Custom backgrounds
- Export options

## Callback Query System

The callback query system handles all inline keyboard interactions.

### Core Callback Handler

```python
@Client.on_callback_query()
async def cb_handler(client: Client, query: CallbackQuery):
```

### Settings Management Callbacks

#### Settings Menu
```python
# Callback data format: settings#group_id
if query.data.startswith("settings"):
    group_id = query.data.split("#", 1)[1]
    settings = await get_settings(int(group_id))
    # Display settings keyboard
```

#### Toggle Settings
```python
# Callback data format: set#setting_name#group_id#new_value
if query.data.startswith("set"):
    _, setting, group_id, value = query.data.split("#")
    await save_group_settings(int(group_id), setting, value == "True")
```

**Available Settings:**
- `auto_filter` - Auto filter on/off
- `imdb` - IMDB integration
- `spell_check` - Spell checking
- `welcome` - Welcome messages
- `file_secure` - File security

### Filter Management Callbacks

#### Manual Filters
```python
# Callback data: manuelfilter#group_id
if query.data.startswith("manuelfilter"):
    group_id = query.data.split("#")[1]
    # Show manual filter help
```

#### Auto Filters
```python
# Callback data: autofilter#group_id
if query.data.startswith("autofilter"):
    group_id = query.data.split("#")[1]
    # Show auto filter help
```

#### Global Filters
```python
# Callback data: globalfilter#group_id
if query.data.startswith("globalfilter"):
    group_id = query.data.split("#")[1]
    # Show global filter help
```

### Connection Management Callbacks

#### Connection Menu
```python
# Callback data: connection#group_id
if query.data.startswith("connection"):
    group_id = query.data.split("#")[1]
    # Show connection options
```

#### Connect to Group
```python
# Callback data: connectcb#group_id
if query.data.startswith("connectcb"):
    group_id = query.data.split("#")[1]
    await make_active(user_id, group_id)
```

#### Disconnect from Group
```python
# Callback data: disconnect#group_id
if query.data.startswith("disconnect"):
    group_id = query.data.split("#")[1]
    await make_inactive(user_id)
```

### File Management Callbacks

#### File Download
```python
# Callback data: files#file_id
if query.data.startswith("files"):
    file_id = query.data.split("#")[1]
    file_details = await get_file_details(file_id)
    # Process file download
```

#### Next/Previous Results
```python
# Callback data: next_offset#query#offset
if query.data.startswith("next"):
    _, search_query, offset = query.data.split("#")
    # Load next page of results
```

## Image Processing API

Advanced image editing capabilities integrated into the bot.

### Basic Filters (`image/edit_1.py`)

#### Brightness Adjustment
```python
async def bright(image_path, factor=1.5):
    """Adjust image brightness"""
    # Returns path to processed image
```

#### Blur Effects
```python
async def g_blur(image_path, radius=2):
    """Apply Gaussian blur"""

async def normal_blur(image_path):
    """Apply normal blur"""

async def box_blur(image_path, radius=2):
    """Apply box blur"""
```

#### Color Effects
```python
async def black_white(image_path):
    """Convert to black and white"""

async def mix(image_path):
    """Apply color mixing effect"""
```

### Advanced Effects (`image/edit_2.py`)

#### Shape Transformations
```python
async def circle_with_bg(image_path, bg_color="white"):
    """Create circular image with background"""

async def circle_without_bg(image_path):
    """Create circular image without background"""

async def edge_curved(image_path, radius=50):
    """Apply curved edges"""
```

#### Artistic Effects
```python
async def contrast(image_path, factor=2.0):
    """Adjust contrast"""

async def sepia_mode(image_path):
    """Apply sepia effect"""

async def pencil(image_path):
    """Convert to pencil sketch"""

async def cartoon(image_path):
    """Apply cartoon effect"""
```

### Border Effects (`image/edit_3.py`)

#### Colored Borders
```python
async def green_border(image_path, width=10):
    """Add green border"""

async def blue_border(image_path, width=10):
    """Add blue border"""

async def black_border(image_path, width=10):
    """Add black border"""

async def red_border(image_path, width=10):
    """Add red border"""
```

### Geometric Transformations (`image/edit_4.py`)

#### Rotation
```python
async def rotate_90(image_path):
    """Rotate 90 degrees clockwise"""

async def rotate_180(image_path):
    """Rotate 180 degrees"""

async def rotate_270(image_path):
    """Rotate 270 degrees clockwise"""
```

#### Background Removal
```python
async def removebg_white(image_path):
    """Remove background, replace with white"""

async def removebg_plain(image_path):
    """Remove background completely"""

async def removebg_sticker(image_path):
    """Convert to sticker format"""
```

#### Special Effects
```python
async def inverted(image_path):
    """Invert colors"""

async def round_sticker(image_path):
    """Create round sticker"""
```

### Glitch Effects (`image/edit_5.py`)

#### Normal Glitch
```python
async def normalglitch_1(image_path):
async def normalglitch_2(image_path):
async def normalglitch_3(image_path):
async def normalglitch_4(image_path):
async def normalglitch_5(image_path):
```

#### Scanline Glitch
```python
async def scanlineglitch_1(image_path):
async def scanlineglitch_2(image_path):
async def scanlineglitch_3(image_path):
async def scanlineglitch_4(image_path):
async def scanlineglitch_5(image_path):
```

### Image Processing Usage

#### Command Handler Example
```python
@Client.on_message(filters.command("edit") & filters.reply)
async def edit_image(bot, message):
    if not message.reply_to_message.photo:
        return await message.reply("Reply to a photo!")
    
    # Download image
    image_path = await message.reply_to_message.download()
    
    # Get effect type
    effect = message.command[1] if len(message.command) > 1 else "bright"
    
    # Apply effect
    if effect == "bright":
        processed_path = await bright(image_path)
    elif effect == "blur":
        processed_path = await g_blur(image_path)
    elif effect == "cartoon":
        processed_path = await cartoon(image_path)
    # ... more effects
    
    # Send processed image
    await message.reply_photo(processed_path)
    
    # Cleanup
    os.remove(image_path)
    os.remove(processed_path)
```

## Advanced Search Features

### Spell Check Integration

The bot includes intelligent spell checking for search queries.

#### Spell Check Implementation
```python
async def spell_check_query(query):
    """Check and suggest corrections for search queries."""
    suggestions = await search_gagala(query)
    
    # Analyze suggestions for common corrections
    corrected_queries = []
    for suggestion in suggestions[:5]:
        # Extract potential movie/series names
        if any(keyword in suggestion.lower() for keyword in ['movie', 'film', 'series', 'show']):
            corrected_queries.append(suggestion)
    
    return corrected_queries
```

#### Smart Search Suggestions
```python
async def get_search_suggestions(query, chat_id):
    """Get intelligent search suggestions based on query."""
    
    # Primary search
    files, _, total = await get_search_results(query, max_results=10)
    
    if total == 0:
        # Try spell check
        suggestions = await spell_check_query(query)
        
        # Search with suggestions
        alternative_results = []
        for suggestion in suggestions:
            alt_files, _, alt_total = await get_search_results(suggestion, max_results=5)
            if alt_total > 0:
                alternative_results.extend(alt_files)
        
        return alternative_results, suggestions
    
    return files, []
```

### Advanced File Filtering

#### Multi-Criteria Search
```python
async def advanced_search(query, filters=None):
    """Perform advanced search with multiple criteria."""
    
    search_filters = filters or {}
    
    # Build MongoDB aggregation pipeline
    pipeline = []
    
    # Text search
    if query:
        pipeline.append({
            "$match": {
                "$text": {"$search": query}
            }
        })
    
    # File type filter
    if search_filters.get("file_type"):
        pipeline.append({
            "$match": {
                "file_type": search_filters["file_type"]
            }
        })
    
    # Size filter
    if search_filters.get("min_size") or search_filters.get("max_size"):
        size_filter = {}
        if search_filters.get("min_size"):
            size_filter["$gte"] = search_filters["min_size"]
        if search_filters.get("max_size"):
            size_filter["$lte"] = search_filters["max_size"]
        
        pipeline.append({
            "$match": {
                "file_size": size_filter
            }
        })
    
    # Date filter
    if search_filters.get("date_from") or search_filters.get("date_to"):
        # Add date filtering logic
        pass
    
    # Execute aggregation
    results = await Media.aggregate(pipeline).to_list(length=None)
    return results
```

### Search Analytics

#### Track Search Queries
```python
search_analytics = {}

async def track_search(user_id, query, results_count):
    """Track search queries for analytics."""
    
    date_key = datetime.now().strftime("%Y-%m-%d")
    
    if date_key not in search_analytics:
        search_analytics[date_key] = {
            "total_searches": 0,
            "unique_users": set(),
            "popular_queries": {},
            "results_stats": []
        }
    
    analytics = search_analytics[date_key]
    analytics["total_searches"] += 1
    analytics["unique_users"].add(user_id)
    
    # Track popular queries
    if query in analytics["popular_queries"]:
        analytics["popular_queries"][query] += 1
    else:
        analytics["popular_queries"][query] = 1
    
    # Track results statistics
    analytics["results_stats"].append(results_count)

async def get_search_statistics():
    """Get search statistics."""
    
    total_searches = sum(day["total_searches"] for day in search_analytics.values())
    unique_users = len(set().union(*[day["unique_users"] for day in search_analytics.values()]))
    
    # Most popular queries
    all_queries = {}
    for day in search_analytics.values():
        for query, count in day["popular_queries"].items():
            all_queries[query] = all_queries.get(query, 0) + count
    
    popular_queries = sorted(all_queries.items(), key=lambda x: x[1], reverse=True)[:10]
    
    return {
        "total_searches": total_searches,
        "unique_users": unique_users,
        "popular_queries": popular_queries
    }
```

## File Processing Pipeline

### Automated File Processing

#### File Analysis
```python
async def analyze_file(file_obj):
    """Analyze uploaded file and extract metadata."""
    
    analysis = {
        "file_id": file_obj.file_id,
        "file_name": file_obj.file_name,
        "file_size": file_obj.file_size,
        "file_type": file_obj.file_type,
        "mime_type": getattr(file_obj, 'mime_type', None),
        "is_video": False,
        "is_audio": False,
        "is_document": False,
        "quality": None,
        "duration": None,
        "resolution": None
    }
    
    # Video analysis
    if file_obj.file_type == "video":
        analysis["is_video"] = True
        if hasattr(file_obj, 'duration'):
            analysis["duration"] = file_obj.duration
        if hasattr(file_obj, 'width') and hasattr(file_obj, 'height'):
            analysis["resolution"] = f"{file_obj.width}x{file_obj.height}"
            
            # Determine quality
            height = file_obj.height
            if height >= 2160:
                analysis["quality"] = "4K"
            elif height >= 1080:
                analysis["quality"] = "1080p"
            elif height >= 720:
                analysis["quality"] = "720p"
            elif height >= 480:
                analysis["quality"] = "480p"
            else:
                analysis["quality"] = "360p"
    
    # Audio analysis
    elif file_obj.file_type == "audio":
        analysis["is_audio"] = True
        if hasattr(file_obj, 'duration'):
            analysis["duration"] = file_obj.duration
    
    # Document analysis
    elif file_obj.file_type == "document":
        analysis["is_document"] = True
        
        # Extract file extension
        if '.' in file_obj.file_name:
            extension = file_obj.file_name.split('.')[-1].lower()
            analysis["extension"] = extension
            
            # Categorize document type
            if extension in ['pdf']:
                analysis["doc_type"] = "PDF"
            elif extension in ['doc', 'docx']:
                analysis["doc_type"] = "Word Document"
            elif extension in ['xls', 'xlsx']:
                analysis["doc_type"] = "Excel Spreadsheet"
            elif extension in ['ppt', 'pptx']:
                analysis["doc_type"] = "PowerPoint Presentation"
            elif extension in ['zip', 'rar', '7z']:
                analysis["doc_type"] = "Archive"
            elif extension in ['apk']:
                analysis["doc_type"] = "Android App"
            else:
                analysis["doc_type"] = "Document"
    
    return analysis
```

#### Content Categorization
```python
async def categorize_content(file_name, analysis):
    """Categorize content based on file name and analysis."""
    
    categories = []
    file_name_lower = file_name.lower()
    
    # Movie/Series detection
    movie_indicators = [
        'movie', 'film', 'cinema', 'series', 'season', 'episode',
        'dvdrip', 'brrip', 'webrip', 'hdtv', 'bluray', 'x264', 'x265'
    ]
    
    if any(indicator in file_name_lower for indicator in movie_indicators):
        categories.append("Entertainment")
        
        if any(word in file_name_lower for word in ['season', 'episode', 's0', 'e0']):
            categories.append("TV Series")
        else:
            categories.append("Movie")
    
    # Software detection
    software_indicators = ['setup', 'installer', 'portable', 'crack', 'patch', '.exe', '.msi']
    if any(indicator in file_name_lower for indicator in software_indicators):
        categories.append("Software")
    
    # Educational content
    education_indicators = ['tutorial', 'course', 'lesson', 'education', 'learning', 'guide']
    if any(indicator in file_name_lower for indicator in education_indicators):
        categories.append("Education")
    
    # Music detection
    music_indicators = ['mp3', 'song', 'music', 'album', 'artist', 'flac', 'wav']
    if any(indicator in file_name_lower for indicator in music_indicators) or analysis.get("is_audio"):
        categories.append("Music")
    
    # Game detection
    game_indicators = ['game', 'pc game', 'android game', 'mod', 'apk', 'gameplay']
    if any(indicator in file_name_lower for indicator in game_indicators):
        categories.append("Games")
    
    return categories if categories else ["General"]
```

#### Automatic Tagging
```python
async def generate_tags(file_name, analysis, categories):
    """Generate relevant tags for better searchability."""
    
    tags = set()
    file_name_lower = file_name.lower()
    
    # Add categories as tags
    tags.update(categories)
    
    # Quality tags
    if analysis.get("quality"):
        tags.add(analysis["quality"])
    
    # Format tags
    if analysis.get("file_type"):
        tags.add(analysis["file_type"].upper())
    
    # Size-based tags
    file_size = analysis.get("file_size", 0)
    if file_size > 5 * 1024 * 1024 * 1024:  # 5GB
        tags.add("Large File")
    elif file_size > 1 * 1024 * 1024 * 1024:  # 1GB
        tags.add("Medium File")
    else:
        tags.add("Small File")
    
    # Language detection (basic)
    language_indicators = {
        'hindi': ['hindi', 'bollywood', 'desi'],
        'english': ['english', 'hollywood', 'eng'],
        'tamil': ['tamil', 'kollywood'],
        'telugu': ['telugu', 'tollywood'],
        'malayalam': ['malayalam', 'mollywood']
    }
    
    for language, indicators in language_indicators.items():
        if any(indicator in file_name_lower for indicator in indicators):
            tags.add(language.title())
            break
    
    # Year extraction
    import re
    year_match = re.search(r'\b(19|20)\d{2}\b', file_name)
    if year_match:
        tags.add(f"Year {year_match.group()}")
    
    return list(tags)
```

### Enhanced File Storage

#### Duplicate Detection
```python
async def check_duplicate(file_hash):
    """Check if file already exists in database."""
    
    existing_file = await Media.find_one({"file_hash": file_hash})
    return existing_file

async def handle_duplicate(existing_file, new_file):
    """Handle duplicate file detection."""
    
    # Update existing file with new file_id if needed
    if existing_file.file_id != new_file.file_id:
        # Add alternative file_id
        alt_ids = existing_file.alternative_ids or []
        if new_file.file_id not in alt_ids:
            alt_ids.append(new_file.file_id)
            existing_file.alternative_ids = alt_ids
            await existing_file.commit()
    
    return existing_file
```

#### File Validation
```python
async def validate_file(file_obj):
    """Validate file before processing."""
    
    validation_result = {
        "valid": True,
        "errors": [],
        "warnings": []
    }
    
    # Size validation
    max_size = 2 * 1024 * 1024 * 1024  # 2GB limit
    if file_obj.file_size > max_size:
        validation_result["valid"] = False
        validation_result["errors"].append(f"File size exceeds {get_size(max_size)} limit")
    
    # Name validation
    if not file_obj.file_name or len(file_obj.file_name.strip()) == 0:
        validation_result["valid"] = False
        validation_result["errors"].append("File name is required")
    
    # Forbidden extensions
    forbidden_extensions = ['.exe', '.bat', '.cmd', '.scr', '.com']
    if any(file_obj.file_name.lower().endswith(ext) for ext in forbidden_extensions):
        validation_result["warnings"].append("Potentially unsafe file type")
    
    return validation_result
```

## Custom Template System

### IMDB Template Engine

#### Template Variables
```python
IMDB_TEMPLATE_VARS = {
    'title': 'Movie/Series title',
    'year': 'Release year',
    'rating': 'IMDB rating',
    'plot': 'Plot summary',
    'genres': 'Genres list',
    'director': 'Director(s)',
    'cast': 'Cast members',
    'runtime': 'Duration',
    'countries': 'Production countries',
    'languages': 'Available languages',
    'poster': 'Poster image URL',
    'url': 'IMDB page URL'
}
```

#### Template Formatting
```python
def format_imdb_template(template, movie_data):
    """Format IMDB template with movie data."""
    
    # Replace template variables
    formatted = template
    for var, value in movie_data.items():
        placeholder = f"{{{var}}}"
        if placeholder in formatted:
            # Handle None values
            display_value = value if value is not None else "N/A"
            formatted = formatted.replace(placeholder, str(display_value))
    
    # Handle conditional sections
    # Example: {if:rating}⭐ Rating: {rating}{/if:rating}
    import re
    
    conditional_pattern = r'\{if:(\w+)\}(.*?)\{/if:\1\}'
    
    def replace_conditional(match):
        var_name = match.group(1)
        content = match.group(2)
        
        if var_name in movie_data and movie_data[var_name]:
            return content
        return ""
    
    formatted = re.sub(conditional_pattern, replace_conditional, formatted, flags=re.DOTALL)
    
    return formatted
```

#### Default Templates
```python
DEFAULT_IMDB_TEMPLATE = """
🎬 <b>{title}</b> ({year})

⭐ <b>Rating:</b> {rating}/10
🎭 <b>Genres:</b> {genres}
⏰ <b>Runtime:</b> {runtime}
🎬 <b>Director:</b> {director}
🌍 <b>Countries:</b> {countries}

📖 <b>Plot:</b>
{plot}

🔗 <b>More Info:</b> {url}
"""

COMPACT_IMDB_TEMPLATE = """
🎬 {title} ({year}) | ⭐ {rating}
🎭 {genres} | ⏰ {runtime}
📖 {plot}
"""

DETAILED_IMDB_TEMPLATE = """
🎬 <b>{title}</b> ({year})

⭐ <b>Rating:</b> {rating}/10 | 🗳️ <b>Votes:</b> {votes}
🎭 <b>Genres:</b> {genres}
⏰ <b>Runtime:</b> {runtime}
🎬 <b>Director:</b> {director}
✍️ <b>Writer:</b> {writer}
🎭 <b>Cast:</b> {cast}
🌍 <b>Countries:</b> {countries}
🗣️ <b>Languages:</b> {languages}
📅 <b>Release Date:</b> {release_date}

📖 <b>Plot:</b>
{plot}

🏢 <b>Production:</b> {producer}
🎵 <b>Music:</b> {composer}
📽️ <b>Cinematography:</b> {cinematographer}

🔗 <b>IMDB:</b> {url}
"""
```

### File Caption Templates

#### Caption Variables
```python
FILE_CAPTION_VARS = {
    'file_name': 'Original file name',
    'file_size': 'Formatted file size',
    'file_type': 'File type (video/audio/document)',
    'quality': 'Video quality (1080p, 720p, etc.)',
    'duration': 'Duration for video/audio files',
    'resolution': 'Video resolution',
    'bot_name': 'Bot display name',
    'channel': 'Channel username',
    'group_name': 'Group name where file was shared'
}
```

#### Caption Formatting
```python
def format_file_caption(template, file_data):
    """Format file caption template with file data."""
    
    formatted = template
    
    # Replace basic variables
    for var, value in file_data.items():
        placeholder = f"{{{var}}}"
        if placeholder in formatted:
            formatted = formatted.replace(placeholder, str(value))
    
    # Handle special formatting
    # Example: {size:MB} for size in megabytes
    import re
    
    # Size formatting
    size_pattern = r'\{file_size:(\w+)\}'
    def format_size(match):
        unit = match.group(1).upper()
        size_bytes = file_data.get('file_size_bytes', 0)
        
        if unit == 'MB':
            return f"{size_bytes / (1024*1024):.2f} MB"
        elif unit == 'GB':
            return f"{size_bytes / (1024*1024*1024):.2f} GB"
        else:
            return get_size(size_bytes)
    
    formatted = re.sub(size_pattern, format_size, formatted)
    
    return formatted
```

#### Default Caption Templates
```python
DEFAULT_CAPTION_TEMPLATE = """
📁 <b>{file_name}</b>

📊 <b>Size:</b> {file_size}
🗂️ <b>Type:</b> {file_type}

🤖 <b>Bot:</b> @{bot_name}
"""

DETAILED_CAPTION_TEMPLATE = """
📁 <b>{file_name}</b>

📊 <b>Size:</b> {file_size}
🗂️ <b>Type:</b> {file_type}
{if:quality}🎥 <b>Quality:</b> {quality}{/if:quality}
{if:duration}⏰ <b>Duration:</b> {duration}{/if:duration}
{if:resolution}📐 <b>Resolution:</b> {resolution}{/if:resolution}

🤖 <b>Shared by:</b> @{bot_name}
📢 <b>Join:</b> @{channel}
"""
```

## Performance Monitoring

### System Resource Monitoring

#### Resource Usage Tracking
```python
import psutil
import time
from datetime import datetime

class PerformanceMonitor:
    def __init__(self):
        self.start_time = time.time()
        self.metrics = {
            'cpu_usage': [],
            'memory_usage': [],
            'disk_usage': [],
            'network_io': [],
            'process_count': []
        }
    
    async def collect_metrics(self):
        """Collect current system metrics."""
        
        current_metrics = {
            'timestamp': datetime.now(),
            'cpu_percent': psutil.cpu_percent(interval=1),
            'memory_percent': psutil.virtual_memory().percent,
            'memory_used': psutil.virtual_memory().used,
            'memory_available': psutil.virtual_memory().available,
            'disk_percent': psutil.disk_usage('/').percent,
            'disk_used': psutil.disk_usage('/').used,
            'disk_free': psutil.disk_usage('/').free,
            'process_count': len(psutil.pids())
        }
        
        # Network I/O
        net_io = psutil.net_io_counters()
        current_metrics['bytes_sent'] = net_io.bytes_sent
        current_metrics['bytes_recv'] = net_io.bytes_recv
        
        # Store metrics
        self.metrics['cpu_usage'].append(current_metrics['cpu_percent'])
        self.metrics['memory_usage'].append(current_metrics['memory_percent'])
        self.metrics['disk_usage'].append(current_metrics['disk_percent'])
        self.metrics['process_count'].append(current_metrics['process_count'])
        
        # Keep only last 100 readings
        for key in self.metrics:
            if len(self.metrics[key]) > 100:
                self.metrics[key] = self.metrics[key][-100:]
        
        return current_metrics
    
    def get_uptime(self):
        """Get bot uptime."""
        uptime_seconds = time.time() - self.start_time
        return self.format_uptime(uptime_seconds)
    
    def format_uptime(self, seconds):
        """Format uptime in human readable format."""
        days = int(seconds // 86400)
        hours = int((seconds % 86400) // 3600)
        minutes = int((seconds % 3600) // 60)
        seconds = int(seconds % 60)
        
        if days > 0:
            return f"{days}d {hours}h {minutes}m {seconds}s"
        elif hours > 0:
            return f"{hours}h {minutes}m {seconds}s"
        elif minutes > 0:
            return f"{minutes}m {seconds}s"
        else:
            return f"{seconds}s"
    
    def get_average_metrics(self):
        """Get average performance metrics."""
        
        if not self.metrics['cpu_usage']:
            return None
        
        return {
            'avg_cpu': sum(self.metrics['cpu_usage']) / len(self.metrics['cpu_usage']),
            'avg_memory': sum(self.metrics['memory_usage']) / len(self.metrics['memory_usage']),
            'avg_disk': sum(self.metrics['disk_usage']) / len(self.metrics['disk_usage']),
            'uptime': self.get_uptime()
        }

# Global monitor instance
performance_monitor = PerformanceMonitor()
```

#### Database Performance Monitoring
```python
class DatabaseMonitor:
    def __init__(self):
        self.query_times = []
        self.slow_queries = []
        
    async def monitor_query(self, query_func, *args, **kwargs):
        """Monitor database query performance."""
        
        start_time = time.time()
        try:
            result = await query_func(*args, **kwargs)
            execution_time = time.time() - start_time
            
            # Log query time
            self.query_times.append(execution_time)
            
            # Log slow queries (>1 second)
            if execution_time > 1.0:
                self.slow_queries.append({
                    'function': query_func.__name__,
                    'execution_time': execution_time,
                    'timestamp': datetime.now(),
                    'args': str(args)[:100],  # Truncate for privacy
                })
            
            # Keep only last 1000 query times
            if len(self.query_times) > 1000:
                self.query_times = self.query_times[-1000:]
            
            # Keep only last 50 slow queries
            if len(self.slow_queries) > 50:
                self.slow_queries = self.slow_queries[-50:]
            
            return result
            
        except Exception as e:
            execution_time = time.time() - start_time
            
            # Log failed query
            self.slow_queries.append({
                'function': query_func.__name__,
                'execution_time': execution_time,
                'timestamp': datetime.now(),
                'error': str(e),
                'args': str(args)[:100]
            })
            
            raise e
    
    def get_performance_stats(self):
        """Get database performance statistics."""
        
        if not self.query_times:
            return None
        
        avg_time = sum(self.query_times) / len(self.query_times)
        max_time = max(self.query_times)
        min_time = min(self.query_times)
        
        return {
            'total_queries': len(self.query_times),
            'average_time': avg_time,
            'max_time': max_time,
            'min_time': min_time,
            'slow_queries_count': len([t for t in self.query_times if t > 1.0]),
            'recent_slow_queries': self.slow_queries[-10:]
        }

# Global database monitor
db_monitor = DatabaseMonitor()
```

#### Performance Statistics Command
```python
@Client.on_message(filters.command("performance") & filters.user(ADMINS))
async def performance_stats(bot, message):
    """Display bot performance statistics."""
    
    # Collect current metrics
    current_metrics = await performance_monitor.collect_metrics()
    avg_metrics = performance_monitor.get_average_metrics()
    db_stats = db_monitor.get_performance_stats()
    
    # Format performance report
    report = f"""
🖥️ <b>System Performance</b>

⏱️ <b>Uptime:</b> {performance_monitor.get_uptime()}

📊 <b>Current Usage:</b>
🔴 CPU: {current_metrics['cpu_percent']:.1f}%
🟡 Memory: {current_metrics['memory_percent']:.1f}%
🔵 Disk: {current_metrics['disk_percent']:.1f}%

📈 <b>Average Usage:</b>
🔴 CPU: {avg_metrics['avg_cpu']:.1f}%
🟡 Memory: {avg_metrics['avg_memory']:.1f}%
🔵 Disk: {avg_metrics['avg_disk']:.1f}%

💾 <b>Memory Details:</b>
Used: {humanbytes(current_metrics['memory_used'])}
Available: {humanbytes(current_metrics['memory_available'])}

💿 <b>Disk Details:</b>
Used: {humanbytes(current_metrics['disk_used'])}
Free: {humanbytes(current_metrics['disk_free'])}

🔄 <b>Processes:</b> {current_metrics['process_count']}
"""
    
    if db_stats:
        report += f"""
🗄️ <b>Database Performance:</b>
Total Queries: {db_stats['total_queries']}
Average Time: {db_stats['average_time']:.3f}s
Max Time: {db_stats['max_time']:.3f}s
Slow Queries: {db_stats['slow_queries_count']}
"""
    
    await message.reply(report)
```

---

This extended documentation provides comprehensive coverage of the advanced features, modules, and implementation details of the PROFESSOR BOT. It serves as a complete reference for developers looking to understand, modify, or extend the bot's functionality.