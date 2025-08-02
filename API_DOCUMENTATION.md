# PROFESSOR BOT - API Documentation

[![Version](https://img.shields.io/badge/version-v4.5.0-blue.svg)](https://github.com/MrMKN/PROFESSOR-BOT)
[![License](https://img.shields.io/badge/License-AGPL-blue)](https://github.com/MrMKN/PROFESSOR-BOT/blob/main/LICENSE)
[![Python](https://img.shields.io/badge/python-3.8+-blue.svg)](https://python.org)

## Table of Contents

1. [Overview](#overview)
2. [Core Architecture](#core-architecture)
3. [Core Classes](#core-classes)
4. [Plugin Modules](#plugin-modules)
5. [Database Models](#database-models)
6. [Utility Functions](#utility-functions)
7. [Configuration](#configuration)
8. [Usage Examples](#usage-examples)
9. [API Reference](#api-reference)
10. [Integration Guide](#integration-guide)

## Overview

PROFESSOR BOT is a powerful Telegram autofilter bot built with Pyrogram. It provides comprehensive file management, filtering, and administrative capabilities for Telegram groups and channels.

### Key Features

- **Auto Filter**: Automatic file filtering and search capabilities
- **Manual Filter**: Custom keyword-based responses
- **IMDB Integration**: Movie and series information retrieval
- **Admin Controls**: Comprehensive group management tools
- **Database Operations**: MongoDB-based data persistence
- **Inline Search**: Telegram inline query support
- **Broadcasting**: Mass messaging capabilities
- **File Management**: Advanced file storage and retrieval

## Core Architecture

```
PROFESSOR-BOT/
├── bot.py                  # Main bot instance and startup
├── info.py                 # Configuration and environment variables
├── utils.py                # Utility functions and helpers
├── Script.py               # Message templates and scripts
├── plugins/                # Plugin modules
│   ├── __init__.py        # Web server and filters
│   ├── commands.py        # Basic bot commands
│   ├── admin_control.py   # Administrative functions
│   ├── filters_global.py  # Global filtering system
│   ├── group_filter.py    # Group-specific filters
│   ├── pm_filter.py       # Private message filters
│   ├── inline.py          # Inline query handling
│   ├── query.py           # Callback query processing
│   ├── connection.py      # Group connections
│   ├── broadcast.py       # Broadcasting functionality
│   ├── file_store.py      # File storage operations
│   ├── index.py           # File indexing
│   └── ExtraMods/         # Additional modules
└── database/              # Database models and operations
    ├── ia_filterdb.py     # Media database operations
    ├── users_chats_db.py  # User and chat management
    ├── filters_mdb.py     # Filter database operations
    ├── gfilters_mdb.py    # Global filter operations
    └── connections_mdb.py # Connection management
```

## Core Classes

### Bot Class

The main bot class extending Pyrogram's Client.

```python
class Bot(Client):
    def __init__(self):
        super().__init__(
            name="Professor-Bot",
            api_id=API_ID,
            api_hash=API_HASH,
            bot_token=BOT_TOKEN,
            workers=200,
            plugins={"root": "plugins"},
            sleep_threshold=10,
        )
```

#### Methods

##### `async start()`
Initializes the bot and sets up necessary configurations.

**Usage:**
```python
bot = Bot()
await bot.start()
```

**Features:**
- Loads banned users and chats from database
- Ensures database indexes
- Sets bot attributes (username, name, etc.)
- Sends startup message to log channel
- Initializes web server if webhook is enabled

##### `async stop(*args)`
Gracefully shuts down the bot.

**Usage:**
```python
await bot.stop()
```

##### `async iter_messages(chat_id, limit, offset=0)`
Iterates through messages in a chat with pagination.

**Parameters:**
- `chat_id` (Union[int, str]): Chat identifier
- `limit` (int): Maximum number of messages to retrieve
- `offset` (int, optional): Starting offset. Defaults to 0.

**Returns:**
- `AsyncGenerator[types.Message, None]`: Async generator of messages

**Usage:**
```python
async for message in bot.iter_messages(chat_id, limit=100):
    print(message.text)
```

### temp Class

Temporary storage class for runtime data.

```python
class temp(object):
    BANNED_USERS = []      # List of banned user IDs
    BANNED_CHATS = []      # List of banned chat IDs
    CURRENT = 0            # Current index counter
    CANCEL = False         # Cancellation flag
    MELCOW = {}           # Welcome message storage
    U_NAME = None         # Bot username
    B_NAME = None         # Bot display name
    SETTINGS = {}         # Group settings cache
    GP_BUTTONS = {}       # Group button configurations
    PM_BUTTONS = {}       # Private message button configurations
    PM_SPELL = {}         # Private message spell check data
    GP_SPELL = {}         # Group spell check data
```

**Usage:**
```python
# Check if user is banned
if user_id in temp.BANNED_USERS:
    return await message.reply("You are banned!")

# Cache group settings
temp.SETTINGS[group_id] = settings

# Store welcome message
temp.MELCOW['welcome'] = welcome_message
```

### Media Document Class

Database model for media files.

```python
@instance.register
class Media(Document):
    file_id = fields.StrField(attribute='_id')
    file_ref = fields.StrField(allow_none=True)
    file_name = fields.StrField(required=True)
    file_size = fields.IntField(required=True)
    file_type = fields.StrField(allow_none=True)
    mime_type = fields.StrField(allow_none=True)
    caption = fields.StrField(allow_none=True)
```

**Usage:**
```python
# Create new media document
media = Media(
    file_id=file_id,
    file_ref=file_ref,
    file_name="example.mp4",
    file_size=1024000,
    file_type="video",
    mime_type="video/mp4"
)
await media.commit()
```

## Plugin Modules

### Commands Module (`plugins/commands.py`)

Handles basic bot commands and interactions.

#### Key Functions

##### `/start` Command Handler
```python
@Client.on_message(filters.command("start") & filters.incoming)
async def start(client, message):
```

**Features:**
- Group vs private chat differentiation
- User registration
- Subscription checking
- File sharing via start parameters

**Usage Examples:**
```
/start                    # Basic start command
/start file_id           # Access specific file
/start batch_id          # Access batch of files
```

##### `/help` Command Handler
Provides comprehensive help information.

**Features:**
- Command explanations
- Feature descriptions
- Usage examples

##### `/settings` Command Handler
Manages group-specific settings.

**Available Settings:**
- Auto filter on/off
- IMDB information display
- Spell check functionality
- File caption customization
- Button configurations

**Usage:**
```
/settings                # View current settings
```

### Admin Control Module (`plugins/admin_control.py`)

Comprehensive administrative functionality.

#### Key Functions

##### User Management
```python
@Client.on_message(filters.command('ban_user') & filters.user(ADMINS))
async def ban_user(bot, message):
```

**Commands:**
- `/ban_user <user_id> [reason]` - Ban a user
- `/unban_user <user_id>` - Unban a user
- `/users` - List all bot users
- `/banned_users` - List banned users

**Usage:**
```python
# Ban user with reason
await bot.send_message(chat_id, "/ban_user 12345 Spam")

# Unban user
await bot.send_message(chat_id, "/unban_user 12345")
```

##### Chat Management
```python
@Client.on_message(filters.command('disable') & filters.user(ADMINS))
async def disable_chat(bot, message):
```

**Commands:**
- `/disable <chat_id> [reason]` - Disable bot in chat
- `/enable <chat_id>` - Re-enable bot in chat
- `/leave <chat_id>` - Leave a chat
- `/chats` - List all chats

**Usage:**
```python
# Disable bot in specific chat
await bot.send_message(admin_chat, "/disable -100123456789 Inactive group")
```

##### Statistics and Monitoring
```python
@Client.on_message(filters.command('stats') & filters.user(ADMINS))
async def stats(bot, message):
```

**Provides:**
- Total users count
- Total chats count
- Database statistics
- System resource usage
- Bot uptime information

### Filter Modules

#### Global Filters (`plugins/filters_global.py`)

Manages bot-wide keyword filters.

##### Adding Global Filters
```python
@Client.on_message(filters.command(['gfilter']) & filters.user(ADMINS))
async def add_gfilter(client, message):
```

**Usage:**
```
/gfilter keyword response_text
/gfilter "hello world" Welcome to our group!
```

**Supported Content Types:**
- Text messages
- Images with captions
- Documents
- Stickers
- GIFs

##### Managing Global Filters
```python
# View all global filters
/gfilters

# Delete specific global filter
/delg keyword

# Delete all global filters
/delallg
```

#### Group Filters (`plugins/group_filter.py`)

Group-specific filtering system with advanced auto-filtering.

##### Auto Filter Features
- Automatic file search based on user queries
- IMDB integration for movies/series
- Spell checking and suggestions
- Multiple file format support

##### Manual Filter Management
```python
@Client.on_message(filters.command(['filter', 'add']))
async def addfilter(client, message):
```

**Usage:**
```
/filter keyword response
/filter "movie name" Check our channel @example
```

**Advanced Filter Options:**
```
# Button filters
/filter keyword response text
[Button Text](buttonurl:https://example.com)

# Alert buttons
/filter keyword response text
[Alert](buttonalert:This is an alert message)
```

### Inline Query Module (`plugins/inline.py`)

Handles Telegram inline queries for file search.

#### Key Functions

##### Inline Search Handler
```python
@Client.on_inline_query()
async def answer(bot, query):
```

**Features:**
- File type filtering (video|, audio|, document|)
- Pagination support
- Subscription checking
- Real-time search results

**Usage Examples:**
```
@professor_bot avengers        # Search for "avengers"
@professor_bot video| spiderman # Search videos only
@professor_bot document| python # Search documents only
```

##### Search Result Processing
```python
async def get_reply_markup(query):
```

**Returns:**
- Inline keyboard with search results
- File size and type information
- Direct download capabilities

### Broadcasting Module (`plugins/broadcast.py`)

Mass messaging functionality for admins.

#### Key Functions

##### Broadcast to Users
```python
@Client.on_message(filters.command("broadcast") & filters.user(ADMINS))
async def broadcast_handler(bot, message):
```

**Usage:**
```
/broadcast Hello everyone! This is a broadcast message.
```

**Features:**
- Send to all bot users
- Progress tracking
- Error handling for blocked users
- Message formatting support

##### Group Broadcast
```python
@Client.on_message(filters.command("grp_broadcast") & filters.user(ADMINS))
async def grp_broadcast_handler(bot, message):
```

**Usage:**
```
/grp_broadcast Important announcement for all groups!
```

### File Store Module (`plugins/file_store.py`)

Advanced file storage and sharing system.

#### Key Functions

##### Single File Link Generation
```python
@Client.on_message(filters.command(['link']) & filters.incoming)
async def gen_link_s(bot, message):
```

**Usage:**
Reply to any media with `/link` to generate a shareable link.

**Features:**
- Permanent file links
- Access tracking
- Multiple file format support

##### Batch Link Generation
```python
@Client.on_message(filters.command(['batch']) & filters.incoming)
async def gen_link_batch(bot, message):
```

**Usage:**
```
/batch https://t.me/channel/1 https://t.me/channel/50
```

**Features:**
- Multiple file processing
- Progress tracking
- Bulk operations

### Connection Module (`plugins/connection.py`)

Manages private message connections to groups.

#### Key Functions

##### Connect to Group
```python
@Client.on_message(filters.command(['connect']) & filters.incoming)
async def pm_connect(bot, message):
```

**Usage:**
```
/connect              # List available groups
/connect group_id     # Connect to specific group
```

**Features:**
- Private group management
- Permission checking
- Connection status tracking

##### Disconnect from Group
```python
@Client.on_message(filters.command(['disconnect']) & filters.incoming)
async def disconnect_pm(bot, message):
```

## Database Models

### Users and Chats Database (`database/users_chats_db.py`)

#### User Management Functions

##### `add_user(user_id, first_name)`
Adds a new user to the database.

**Parameters:**
- `user_id` (int): Telegram user ID
- `first_name` (str): User's first name

**Usage:**
```python
await db.add_user(12345, "John Doe")
```

##### `is_user_exist(user_id)`
Checks if user exists in database.

**Returns:** `bool`

##### `get_users()`
Retrieves all users from database.

**Returns:** `List[dict]`

#### Chat Management Functions

##### `add_chat(chat_id, title, username=None)`
Adds a new chat to the database.

**Parameters:**
- `chat_id` (int): Telegram chat ID
- `title` (str): Chat title
- `username` (str, optional): Chat username

##### `get_settings(chat_id)`
Retrieves group settings.

**Returns:** `dict` with settings configuration

##### `update_settings(chat_id, settings)`
Updates group settings.

**Usage:**
```python
settings = await db.get_settings(chat_id)
settings['auto_filter'] = True
await db.update_settings(chat_id, settings)
```

### Media Filter Database (`database/ia_filterdb.py`)

#### Core Functions

##### `save_file(media)`
Saves media file to database.

**Parameters:**
- `media`: Pyrogram media object

**Returns:** `Tuple[bool, int]` - (success, status_code)

**Usage:**
```python
success, status = await save_file(message.document)
if success:
    print("File saved successfully")
```

##### `get_search_results(query, file_type=None, max_results=10, offset=0)`
Searches for files in database.

**Parameters:**
- `query` (str): Search query
- `file_type` (str, optional): Filter by file type
- `max_results` (int): Maximum results to return
- `offset` (int): Pagination offset

**Returns:** `Tuple[List, int, int]` - (files, next_offset, total_count)

**Usage:**
```python
files, next_offset, total = await get_search_results(
    "avengers", 
    file_type="video", 
    max_results=20
)
```

##### `get_file_details(query)`
Gets detailed file information.

**Returns:** `List[dict]` with file details

##### `delete_file(file_id)`
Deletes file from database.

**Usage:**
```python
await delete_file("unique_file_id")
```

### Filter Database (`database/filters_mdb.py`)

#### Filter Management

##### `add_filter(grp_id, text, reply_text, btn, file, alert)`
Adds a new filter to group.

**Parameters:**
- `grp_id` (int): Group ID
- `text` (str): Filter keyword
- `reply_text` (str): Response text
- `btn` (str): Button configuration
- `file` (str): File ID if applicable
- `alert` (str): Alert message

##### `get_filters(grp_id, text)`
Retrieves filters for specific keyword.

**Returns:** `List[dict]` of matching filters

##### `delete_filter(grp_id, text)`
Deletes specific filter.

**Usage:**
```python
await delete_filter(group_id, "keyword")
```

## Utility Functions

### Core Utilities (`utils.py`)

#### Authentication and Subscription

##### `async is_subscribed(bot, query)`
Checks if user is subscribed to required channels.

**Parameters:**
- `bot`: Bot instance
- `query`: User query or message

**Returns:** `bool`

**Usage:**
```python
if not await is_subscribed(bot, message):
    await message.reply("Please subscribe to our channel!")
```

#### IMDB Integration

##### `async get_poster(query, bulk=False, id=False, file=None)`
Retrieves movie/series information from IMDB.

**Parameters:**
- `query` (str): Movie/series name
- `bulk` (bool): Return multiple results
- `id` (bool): Query is IMDB ID
- `file`: File information for context

**Returns:** `dict` with movie information

**Usage:**
```python
movie_info = await get_poster("Avengers Endgame")
print(f"Title: {movie_info['title']}")
print(f"Rating: {movie_info['rating']}")
print(f"Plot: {movie_info['plot']}")
```

**Returned Fields:**
- `title`: Movie title
- `rating`: IMDB rating
- `plot`: Movie plot summary
- `poster`: Poster image URL
- `cast`: Cast members
- `director`: Director(s)
- `genres`: Movie genres
- `year`: Release year
- `runtime`: Movie duration
- `countries`: Production countries
- `languages`: Available languages

#### File Operations

##### `get_size(size)`
Converts bytes to human-readable format.

**Parameters:**
- `size` (int): Size in bytes

**Returns:** `str` formatted size

**Usage:**
```python
file_size = get_size(1048576)  # Returns "1.00 MB"
```

##### `get_file_id(msg)`
Extracts file ID from message.

**Parameters:**
- `msg` (Message): Pyrogram message object

**Returns:** Media object with file information

**Usage:**
```python
file_obj = get_file_id(message)
if file_obj:
    print(f"File type: {file_obj.message_type}")
    print(f"File ID: {file_obj.file_id}")
```

#### User Extraction

##### `extract_user(message)`
Extracts user information from message.

**Parameters:**
- `message` (Message): Pyrogram message object

**Returns:** `Union[int, str]` user ID or username

**Usage:**
```python
user = extract_user(message)
user_info = await bot.get_users(user)
```

#### Text Processing

##### `parser(text, keyword)`
Parses text for filter responses with button support.

**Parameters:**
- `text` (str): Input text with markup
- `keyword` (str): Filter keyword

**Returns:** `Tuple[str, List]` - (parsed_text, buttons)

**Button Syntax:**
```
[Button Text](buttonurl:https://example.com)
[Alert Button](buttonalert:Alert message)
[Same Line](buttonurl:https://example.com:same)
```

**Usage:**
```python
text = "Hello [Visit Site](buttonurl:https://example.com)"
parsed_text, buttons = parser(text, "greeting")
```

#### Search Functions

##### `async search_gagala(text)`
Performs Google search for spell checking.

**Parameters:**
- `text` (str): Search query

**Returns:** `List[str]` search result titles

**Usage:**
```python
suggestions = await search_gagala("avengrs")  # Typo in "avengers"
# Returns corrected suggestions
```

## Configuration

### Environment Variables (`info.py`)

#### Required Variables

##### Bot Configuration
```python
API_ID = int(environ['API_ID'])           # Telegram API ID
API_HASH = environ['API_HASH']            # Telegram API Hash  
BOT_TOKEN = environ['BOT_TOKEN']          # Bot token from @BotFather
```

##### Database Configuration
```python
DATABASE_URL = environ.get('DATABASE_URL', "")           # MongoDB connection URL
DATABASE_NAME = environ.get('DATABASE_NAME', "Cluster0") # MongoDB database name
COLLECTION_NAME = environ.get('COLLECTION_NAME', 'Telegram_files') # Collection name
```

##### Channel and Admin Configuration
```python
CHANNELS = [int(ch) if id_pattern.search(ch) else ch for ch in environ.get('CHANNELS', '0').split()]
ADMINS = [int(admin) if id_pattern.search(admin) else admin for admin in environ.get('ADMINS', '').split()]
LOG_CHANNEL = int(environ.get('LOG_CHANNEL', 0))     # Log channel ID
AUTH_CHANNEL = int(auth_channel) if auth_channel and id_pattern.search(auth_channel) else None
SUPPORT_CHAT = environ.get('SUPPORT_CHAT', 'MKN_BOTZ_DISCUSSION_GROUP')
```

#### Optional Variables

##### Feature Toggles
```python
PMFILTER = is_enabled(environ.get('PMFILTER', "True"), True)          # Private message filtering
G_FILTER = is_enabled(environ.get("G_FILTER", "True"), True)         # Global filtering
BUTTON_LOCK = is_enabled(environ.get("BUTTON_LOCK", "True"), True)   # Button restrictions
IMDB = is_enabled(environ.get('IMDB', "True"), True)                 # IMDB integration
SINGLE_BUTTON = is_enabled(environ.get('SINGLE_BUTTON', "True"), True) # Single button layout
SPELL_CHECK_REPLY = is_enabled(environ.get("SPELL_CHECK_REPLY", "True"), True) # Spell checking
```

##### Customization Options
```python
CUSTOM_FILE_CAPTION = environ.get("CUSTOM_FILE_CAPTION", "{file_name}")  # File caption template
IMDB_TEMPLATE = environ.get("IMDB_TEMPLATE", script.IMDB_TEMPLATE)       # IMDB display template
CACHE_TIME = int(environ.get('CACHE_TIME', 300))                        # Inline query cache time
MAX_RIST_BTNS = int(environ.get('MAX_RIST_BTNS', "10"))                 # Maximum result buttons
IMDB_DELET_TIME = int(environ.get('IMDB_DELET_TIME', "300"))            # IMDB message delete time
```

##### URL Shortening
```python
SHORT_URL = environ.get("SHORT_URL")    # URL shortener service URL
SHORT_API = environ.get("SHORT_API")    # URL shortener API key
```

### Configuration Helper Functions

##### `is_enabled(value, default)`
Converts string values to boolean.

**Parameters:**
- `value` (str): Configuration value
- `default` (bool): Default value if parsing fails

**Accepted True Values:** "on", "true", "yes", "1", "enable", "y"
**Accepted False Values:** "off", "false", "no", "0", "disable", "n"

**Usage:**
```python
feature_enabled = is_enabled(environ.get('FEATURE', "True"), True)
```

## Usage Examples

### Basic Bot Setup

```python
from bot import Bot
import asyncio

async def main():
    # Initialize bot
    bot = Bot()
    
    # Start bot
    await bot.start()
    print("Bot started successfully!")
    
    # Keep bot running
    await bot.idle()

if __name__ == "__main__":
    asyncio.run(main())
```

### Adding Custom Filters

```python
from database.filters_mdb import add_filter

async def add_custom_filter(group_id, keyword, response):
    """Add a custom filter to a group."""
    success = await add_filter(
        grp_id=group_id,
        text=keyword,
        reply_text=response,
        btn="",  # No buttons
        file="", # No file
        alert="" # No alert
    )
    return success

# Usage
await add_custom_filter(-100123456789, "hello", "Hello! Welcome to our group!")
```

### File Upload and Indexing

```python
from database.ia_filterdb import save_file

async def process_media_message(bot, message):
    """Process and index media files."""
    if message.media:
        # Save file to database
        success, status = await save_file(message.document or message.video or message.audio)
        
        if success:
            await message.reply("✅ File indexed successfully!")
        else:
            await message.reply("❌ Failed to index file.")

# Register handler
@Client.on_message(filters.media & filters.group)
async def media_handler(bot, message):
    await process_media_message(bot, message)
```

### Custom Search Implementation

```python
from database.ia_filterdb import get_search_results
from utils import get_size

async def custom_search(query, file_type=None):
    """Perform custom file search."""
    files, next_offset, total = await get_search_results(
        query=query,
        file_type=file_type,
        max_results=50,
        offset=0
    )
    
    results = []
    for file in files:
        results.append({
            'name': file.file_name,
            'size': get_size(file.file_size),
            'type': file.file_type,
            'id': file.file_id
        })
    
    return results, total

# Usage
results, total = await custom_search("python tutorial", "document")
print(f"Found {total} files")
```

### IMDB Integration Example

```python
from utils import get_poster

async def get_movie_info(movie_name):
    """Get comprehensive movie information."""
    movie_info = await get_poster(movie_name)
    
    if movie_info:
        info_text = f"""
🎬 **{movie_info['title']}** ({movie_info['year']})

⭐ **Rating:** {movie_info['rating']}/10
🎭 **Genres:** {movie_info['genres']}
⏰ **Runtime:** {movie_info['runtime']}
🎬 **Director:** {movie_info['director']}
🌍 **Countries:** {movie_info['countries']}

📖 **Plot:**
{movie_info['plot']}

🔗 **IMDB Link:** {movie_info['url']}
        """
        return info_text, movie_info['poster']
    
    return None, None

# Usage
info, poster = await get_movie_info("The Avengers")
```

### Broadcast Message Implementation

```python
from database.users_chats_db import db
from pyrogram.errors import FloodWait, InputUserDeactivated, UserIsBlocked
import asyncio

async def broadcast_to_users(bot, message_text):
    """Broadcast message to all bot users."""
    users = await db.get_all_users()
    broadcast_ids = []
    
    success_count = 0
    failed_count = 0
    
    for user in users:
        try:
            await bot.send_message(user['id'], message_text)
            success_count += 1
            await asyncio.sleep(0.1)  # Rate limiting
            
        except FloodWait as e:
            await asyncio.sleep(e.x)
            
        except (InputUserDeactivated, UserIsBlocked):
            # User has blocked bot or deactivated account
            failed_count += 1
            
        except Exception as e:
            failed_count += 1
            print(f"Failed to send to {user['id']}: {e}")
    
    return success_count, failed_count

# Usage
success, failed = await broadcast_to_users(bot, "Important announcement!")
print(f"Broadcast completed: {success} successful, {failed} failed")
```

### Group Settings Management

```python
from utils import get_settings, save_group_settings

async def configure_group(group_id, settings_dict):
    """Configure group settings."""
    current_settings = await get_settings(group_id)
    
    # Update settings
    for key, value in settings_dict.items():
        await save_group_settings(group_id, key, value)
    
    return await get_settings(group_id)

# Usage
new_settings = {
    'auto_filter': True,
    'imdb': True,
    'spell_check': True,
    'welcome': True
}

updated_settings = await configure_group(-100123456789, new_settings)
```

## API Reference

### Bot Commands

#### User Commands
- `/start` - Start the bot and get basic information
- `/help` - Get help information and command list
- `/settings` - View and modify group settings (group admin only)
- `/id` - Get user and chat IDs
- `/info <user>` - Get user information
- `/imdb <movie_name>` - Get movie/series information

#### Filter Commands
- `/filter <keyword> <response>` - Add manual filter
- `/filters` - View all filters in the group
- `/del <keyword>` - Delete specific filter
- `/delall` - Delete all filters

#### Connection Commands (Private Messages)
- `/connect` - Connect to a group for management
- `/connections` - View all connections
- `/disconnect` - Disconnect from current group

#### File Store Commands
- `/link` - Generate link for media file (reply to file)
- `/batch <start_link> <end_link>` - Generate batch link

#### Global Filter Commands (Admin Only)
- `/gfilter <keyword> <response>` - Add global filter
- `/gfilters` - View all global filters
- `/delg <keyword>` - Delete specific global filter
- `/delallg` - Delete all global filters

#### Admin Commands
- `/broadcast <message>` - Broadcast to all users
- `/grp_broadcast <message>` - Broadcast to all groups
- `/ban_user <user_id> [reason]` - Ban user from bot
- `/unban_user <user_id>` - Unban user
- `/users` - Get users list and statistics
- `/chats` - Get chats list and statistics
- `/leave <chat_id>` - Leave from a chat
- `/disable <chat_id> [reason]` - Disable bot in a chat
- `/enable <chat_id>` - Re-enable bot in a chat
- `/stats` - Get bot statistics
- `/logs` - Get recent error logs

### Callback Query Actions

#### Settings Callbacks
- `settings#<group_id>` - Settings main menu
- `set#<setting>#<group_id>#<value>` - Toggle setting
- `help` - Help information
- `about` - About information
- `source` - Source code information

#### Filter Callbacks
- `manuelfilter#<group_id>` - Manual filters help
- `autofilter#<group_id>` - Auto filter help
- `globalfilter#<group_id>` - Global filters help

#### Connection Callbacks
- `connection#<group_id>` - Connection management
- `connectcb#<group_id>` - Connect to group
- `disconnect#<group_id>` - Disconnect from group

### Inline Queries

#### Search Syntax
- `<query>` - Search all file types
- `video| <query>` - Search videos only
- `audio| <query>` - Search audio files only
- `document| <query>` - Search documents only

#### Response Format
Inline results include:
- File name and size
- File type icon
- Download button
- Share button

## Integration Guide

### Extending the Bot

#### Adding New Commands

```python
from pyrogram import Client, filters
from pyrogram.types import Message

@Client.on_message(filters.command("mycommand") & filters.incoming)
async def my_command_handler(bot: Client, message: Message):
    """Custom command handler."""
    await message.reply("This is my custom command!")

# Register in plugins directory
```

#### Creating Custom Filters

```python
from pyrogram import filters
from pyrogram.types import Message

async def custom_filter_func(_, __, message: Message):
    """Custom filter logic."""
    return message.text and "special_keyword" in message.text.lower()

custom_filter = filters.create(custom_filter_func)

@Client.on_message(custom_filter)
async def handle_custom_filter(bot, message):
    await message.reply("Custom filter triggered!")
```

#### Adding Database Models

```python
from umongo import fields, Document
from database.ia_filterdb import instance

@instance.register
class MyCustomModel(Document):
    name = fields.StrField(required=True)
    value = fields.IntField()
    created_at = fields.DateTimeField()
    
    class Meta:
        collection_name = 'my_custom_collection'

# Usage
custom_doc = MyCustomModel(name="example", value=42)
await custom_doc.commit()
```

### Plugin Development

#### Plugin Structure

```python
# plugins/my_plugin.py
from pyrogram import Client, filters
from pyrogram.types import Message, CallbackQuery

# Command handlers
@Client.on_message(filters.command("myplugin"))
async def my_plugin_command(bot: Client, message: Message):
    pass

# Callback handlers  
@Client.on_callback_query(filters.regex("^myplugin"))
async def my_plugin_callback(bot: Client, query: CallbackQuery):
    pass

# Message handlers
@Client.on_message(filters.text & filters.group)
async def my_plugin_message(bot: Client, message: Message):
    pass
```

#### Best Practices

1. **Error Handling**: Always wrap handlers in try-except blocks
2. **Rate Limiting**: Use appropriate delays for API calls
3. **Database Operations**: Use async/await properly
4. **User Permissions**: Check user permissions before executing commands
5. **Logging**: Use proper logging for debugging

### Deployment

#### Environment Setup

```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export API_ID="your_api_id"
export API_HASH="your_api_hash"
export BOT_TOKEN="your_bot_token"
export DATABASE_URL="mongodb://localhost:27017"
export DATABASE_NAME="professor_bot"

# Run bot
python bot.py
```

#### Docker Deployment

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
CMD ["python", "bot.py"]
```

#### Heroku Deployment

1. Connect GitHub repository
2. Set environment variables in Heroku dashboard
3. Enable automatic deploys
4. Use `Procfile` for process configuration

### Monitoring and Maintenance

#### Health Checks

```python
async def health_check():
    """Perform bot health check."""
    try:
        # Check database connection
        await db.test_connection()
        
        # Check bot API
        me = await bot.get_me()
        
        return {"status": "healthy", "bot": me.username}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}
```

#### Logging Configuration

```python
# logging.conf
[loggers]
keys=root,pyrogram

[handlers]
keys=console,file

[formatters]
keys=default

[logger_root]
level=INFO
handlers=console,file

[logger_pyrogram]
level=WARNING
handlers=console
qualname=pyrogram
propagate=0

[handler_console]
class=StreamHandler
level=INFO
formatter=default
args=(sys.stdout,)

[handler_file]
class=FileHandler
level=INFO
formatter=default
args=('bot.log',)

[formatter_default]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
```

---

## License

This project is licensed under the GNU Affero General Public License v3.0. See the [LICENSE](LICENSE) file for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

- **Telegram Support**: [@MKN_BOTZ_DISCUSSION_GROUP](https://t.me/MKN_BOTZ_DISCUSSION_GROUP)
- **Updates Channel**: [@mkn_bots_updates](https://t.me/mkn_bots_updates)
- **Issues**: [GitHub Issues](https://github.com/MrMKN/PROFESSOR-BOT/issues)

---

*Last updated: 2024*
*Version: v4.5.0*