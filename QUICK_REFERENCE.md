# PROFESSOR BOT - Quick Reference Guide

This is a condensed reference guide for quick command and API lookups.

## 🚀 Quick Start

### Environment Variables (Required)
```bash
API_ID="your_telegram_api_id"
API_HASH="your_telegram_api_hash"
BOT_TOKEN="your_bot_token"
DATABASE_URL="mongodb_connection_string"
DATABASE_NAME="database_name"
ADMINS="admin_user_ids_space_separated"
CHANNELS="channel_ids_space_separated"
LOG_CHANNEL="log_channel_id"
```

### Run Bot
```bash
python bot.py
```

## 📋 Command Reference

### 👤 User Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/start` | Start bot/access files | `/start` or `/start file_id` |
| `/help` | Get help information | `/help` |
| `/id` | Get user/chat IDs | `/id` |
| `/info` | Get user information | `/info @username` |
| `/settings` | Group settings (admins) | `/settings` |
| `/imdb` | Movie/series info | `/imdb Avengers` |

### 🔍 Search Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| Inline Query | Search files | `@bot_username query` |
| Type Filter | Filter by type | `@bot_username video\|spiderman` |
| | | `@bot_username audio\|song name` |
| | | `@bot_username document\|python` |

### 🎛️ Filter Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/filter` | Add manual filter | `/filter hello Welcome message!` |
| `/filters` | View all filters | `/filters` |
| `/del` | Delete filter | `/del hello` |
| `/delall` | Delete all filters | `/delall` |

### 🔗 Connection Commands (PM Only)

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/connect` | Connect to group | `/connect` or `/connect group_id` |
| `/connections` | View connections | `/connections` |
| `/disconnect` | Disconnect | `/disconnect` |

### 💾 File Store Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/link` | Generate file link | Reply to file with `/link` |
| `/batch` | Batch file links | `/batch start_link end_link` |

### 🌐 Global Filter Commands (Admin Only)

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/gfilter` | Add global filter | `/gfilter keyword response` |
| `/gfilters` | View global filters | `/gfilters` |
| `/delg` | Delete global filter | `/delg keyword` |
| `/delallg` | Delete all global | `/delallg` |

### 👨‍💼 Admin Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/broadcast` | Broadcast to users | `/broadcast message` |
| `/grp_broadcast` | Broadcast to groups | `/grp_broadcast message` |
| `/ban_user` | Ban user | `/ban_user user_id reason` |
| `/unban_user` | Unban user | `/unban_user user_id` |
| `/users` | List users | `/users` |
| `/chats` | List chats | `/chats` |
| `/leave` | Leave chat | `/leave chat_id` |
| `/disable` | Disable chat | `/disable chat_id reason` |
| `/enable` | Enable chat | `/enable chat_id` |
| `/stats` | Bot statistics | `/stats` |
| `/logs` | Recent logs | `/logs` |

### 🛠️ Group Moderation Commands

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/ban` | Ban user | `/ban @username` |
| `/tban` | Temporary ban | `/tban @username 1h` |
| `/unban` | Unban user | `/unban @username` |
| `/mute` | Mute user | `/mute @username` |
| `/tmute` | Temporary mute | `/tmute @username 30m` |
| `/unmute` | Unmute user | `/unmute @username` |
| `/kick` | Kick user | `/kick @username` |
| `/promote` | Promote to admin | `/promote @username` |
| `/demote` | Demote admin | `/demote @username` |

### 🎨 Extra Features

| Command | Description | Usage Example |
|---------|-------------|---------------|
| `/telegraph` | Upload to Telegraph | Reply to text with `/telegraph` |
| `/tgmedia` | Upload media to Telegraph | Reply to media with `/tgmedia` |
| `/paste` | Paste text | Reply to text with `/paste` |
| `/short` | Shorten URL | `/short https://longurl.com` |
| `/json` | Format JSON | Reply to JSON with `/json` |
| `/genpass` | Generate password | `/genpass 16` |
| `/font` | Style text | Reply with `/font bold` |
| `/tts` | Text to speech | Reply with `/tts` |
| `/carbon` | Code screenshot | Reply with `/carbon` |

## 🔧 API Quick Reference

### Core Classes

#### Bot Class
```python
from bot import Bot
bot = Bot()
await bot.start()
```

#### Database Operations
```python
# User management
from database.users_chats_db import db
await db.add_user(user_id, name)
await db.is_user_exist(user_id)

# File operations
from database.ia_filterdb import save_file, get_search_results
success, status = await save_file(media)
files, offset, total = await get_search_results("query")
```

#### Utility Functions
```python
from utils import get_size, get_poster, is_subscribed
size_str = get_size(bytes)
movie_info = await get_poster("movie name")
subscribed = await is_subscribed(bot, message)
```

### Filter Syntax

#### Button Filters
```
Response text
[Button Text](buttonurl:https://example.com)
[Alert Button](buttonalert:Alert message)
[Same Line](buttonurl:https://example.com:same)
```

#### File Caption Variables
```
{file_name} - File name
{file_size} - File size
{file_type} - File type
{quality} - Video quality
{bot_name} - Bot name
```

#### IMDB Template Variables
```
{title} - Movie title
{year} - Release year
{rating} - IMDB rating
{plot} - Plot summary
{genres} - Genres
{director} - Director
{cast} - Cast members
```

## ⚡ Performance Tips

### Database Optimization
- Use indexes for search queries
- Implement query monitoring
- Regular database maintenance

### File Management
- Validate files before saving
- Implement duplicate detection
- Use appropriate file size limits

### Memory Management
- Monitor system resources
- Clean up temporary files
- Implement caching strategies

## 🔄 Callback Query Patterns

| Pattern | Description | Example |
|---------|-------------|---------|
| `settings#group_id` | Settings menu | `settings#-100123456` |
| `set#setting#group_id#value` | Toggle setting | `set#auto_filter#-100123456#True` |
| `files#file_id` | File download | `files#BAADBAADrwADBREAAQ` |
| `next#query#offset` | Next results | `next#avengers#10` |
| `connect#group_id` | Connection menu | `connect#-100123456` |

## 🚨 Error Handling

### Common Error Types
- `FloodWait` - Rate limiting
- `UserNotParticipant` - Not in channel
- `ChatAdminRequired` - Need admin rights
- `PeerIdInvalid` - Invalid user/chat ID

### Error Handling Pattern
```python
try:
    # Bot operation
    result = await bot_operation()
except FloodWait as e:
    await asyncio.sleep(e.x)
except Exception as e:
    logger.error(f"Error: {e}")
```

## 📊 Monitoring Commands

### System Health
```bash
/stats          # Bot statistics
/performance    # System performance (admin)
```

### Database Health
- Monitor query times
- Track slow queries
- Check connection status

## 🔐 Security Best Practices

### Environment Variables
- Never commit sensitive data
- Use strong passwords
- Rotate API keys regularly

### User Permissions
- Validate admin permissions
- Check user bans
- Implement rate limiting

### File Security
- Validate file types
- Check file sizes
- Scan for malicious content

## 📦 Deployment Checklist

### Prerequisites
- [ ] Python 3.8+
- [ ] MongoDB database
- [ ] Telegram Bot Token
- [ ] API credentials

### Environment Setup
- [ ] Set all required variables
- [ ] Configure optional features
- [ ] Set up logging
- [ ] Configure web server (if needed)

### Production Deployment
- [ ] Use process manager (PM2, systemd)
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Set up error tracking

## 📚 Additional Resources

### Documentation Files
- `API_DOCUMENTATION.md` - Complete API reference
- `EXTENDED_API_DOCUMENTATION.md` - Advanced features
- `README.md` - Project overview

### Support Channels
- Telegram: @MKN_BOTZ_DISCUSSION_GROUP
- Updates: @mkn_bots_updates
- GitHub: Issues and PRs

### Configuration Examples

#### Heroku Config
```bash
heroku config:set API_ID=your_api_id
heroku config:set API_HASH=your_api_hash
heroku config:set BOT_TOKEN=your_token
```

#### Docker Environment
```dockerfile
ENV API_ID=your_api_id
ENV API_HASH=your_api_hash
ENV BOT_TOKEN=your_token
```

---

**Version:** v4.5.0  
**Last Updated:** 2024  
**License:** GNU AGPL v3.0