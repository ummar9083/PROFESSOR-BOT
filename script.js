// Sample video data with placeholder content
const sampleVideos = [
    {
        id: 1,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        username: 'creative_artist',
        description: 'Amazing creativity in motion! 🎨✨ #art #creative #viral',
        music: 'Original Sound - creative_artist',
        likes: '12.5K',
        comments: '892',
        shares: '234'
    },
    {
        id: 2,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        username: 'nature_lover',
        description: 'Beautiful moments in nature 🌿🦋 #nature #peaceful #wildlife',
        music: 'Peaceful Sounds',
        likes: '8.9K',
        comments: '456',
        shares: '123'
    },
    {
        id: 3,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        username: 'adventure_seeker',
        description: 'Life is an adventure! 🔥🚀 #adventure #motivation #explore',
        music: 'Epic Adventure Mix',
        likes: '15.2K',
        comments: '1.2K',
        shares: '567'
    },
    {
        id: 4,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        username: 'wanderlust_soul',
        description: 'Escape to paradise 🏝️🌊 #travel #beach #paradise #vacation',
        music: 'Tropical Vibes',
        likes: '20.1K',
        comments: '2.1K',
        shares: '890'
    },
    {
        id: 5,
        videoSrc: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        userAvatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
        username: 'fun_times',
        description: 'Having the best time ever! 🎉🎊 #fun #party #friends #goodvibes',
        music: 'Party Anthem',
        likes: '18.7K',
        comments: '1.8K',
        shares: '678'
    }
];

class VideoScrollApp {
    constructor() {
        this.currentVideoIndex = 0;
        this.isScrolling = false;
        this.touchStartY = 0;
        this.videos = [];
        this.videoContainer = document.getElementById('videoContainer');
        
        this.init();
    }

    init() {
        this.loadVideos();
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupKeyboardControls();
    }

    loadVideos() {
        this.videoContainer.innerHTML = '<div class="loading">Loading videos...</div>';
        
        setTimeout(() => {
            this.videoContainer.innerHTML = '';
            sampleVideos.forEach((videoData, index) => {
                const videoElement = this.createVideoElement(videoData, index);
                this.videoContainer.appendChild(videoElement);
                this.videos.push(videoElement);
            });
            
            // Auto-play first video
            if (this.videos.length > 0) {
                this.playVideo(0);
            }
        }, 1000);
    }

    createVideoElement(videoData, index) {
        const template = document.querySelector('.video-item-template');
        const videoItem = template.cloneNode(true);
        videoItem.style.display = 'block';
        videoItem.classList.remove('video-item-template');
        videoItem.dataset.index = index;

        // Set video source
        const video = videoItem.querySelector('.video-player');
        video.src = videoData.videoSrc;
        video.dataset.index = index;

        // Set user information
        const userAvatar = videoItem.querySelector('.user-avatar');
        userAvatar.src = videoData.userAvatar;
        userAvatar.alt = videoData.username;

        const username = videoItem.querySelector('.username');
        username.textContent = `@${videoData.username}`;

        const description = videoItem.querySelector('.video-description');
        description.textContent = videoData.description;

        const music = videoItem.querySelector('.video-music span');
        music.textContent = videoData.music;

        // Set action counts
        const likesCount = videoItem.querySelector('.like-btn .action-count');
        likesCount.textContent = videoData.likes;

        const commentsCount = videoItem.querySelector('.comment-btn .action-count');
        commentsCount.textContent = videoData.comments;

        const sharesCount = videoItem.querySelector('.share-btn .action-count');
        sharesCount.textContent = videoData.shares;

        // Add event listeners for this video
        this.setupVideoControls(videoItem, index);

        return videoItem;
    }

    setupVideoControls(videoItem, index) {
        const video = videoItem.querySelector('.video-player');
        const playPauseBtn = videoItem.querySelector('.play-pause-btn');
        const volumeBtn = videoItem.querySelector('.volume-btn');
        const progressBar = videoItem.querySelector('.progress-bar');
        const progressFill = videoItem.querySelector('.progress-fill');
        const likeBtn = videoItem.querySelector('.like-btn');
        const commentBtn = videoItem.querySelector('.comment-btn');
        const shareBtn = videoItem.querySelector('.share-btn');
        const bookmarkBtn = videoItem.querySelector('.bookmark-btn');

        // Video click to play/pause
        video.addEventListener('click', () => {
            this.togglePlayPause(video, playPauseBtn);
        });

        // Play/pause button
        playPauseBtn.addEventListener('click', () => {
            this.togglePlayPause(video, playPauseBtn);
        });

        // Volume toggle
        volumeBtn.addEventListener('click', () => {
            this.toggleMute(video, volumeBtn);
        });

        // Progress bar
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${progress}%`;
        });

        progressBar.addEventListener('click', (e) => {
            const rect = progressBar.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            video.currentTime = pos * video.duration;
        });

        // Action buttons
        likeBtn.addEventListener('click', () => {
            this.toggleLike(likeBtn);
        });

        commentBtn.addEventListener('click', () => {
            this.showComments(index);
        });

        shareBtn.addEventListener('click', () => {
            this.shareVideo(index);
        });

        bookmarkBtn.addEventListener('click', () => {
            this.toggleBookmark(bookmarkBtn);
        });

        // Video ended
        video.addEventListener('ended', () => {
            this.nextVideo();
        });
    }

    setupEventListeners() {
        // Mouse wheel scrolling
        this.videoContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            if (this.isScrolling) return;

            if (e.deltaY > 0) {
                this.nextVideo();
            } else {
                this.previousVideo();
            }
        });

        // Touch events for mobile
        this.videoContainer.addEventListener('touchstart', (e) => {
            this.touchStartY = e.touches[0].clientY;
        });

        this.videoContainer.addEventListener('touchend', (e) => {
            if (this.isScrolling) return;
            
            const touchEndY = e.changedTouches[0].clientY;
            const diff = this.touchStartY - touchEndY;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextVideo();
                } else {
                    this.previousVideo();
                }
            }
        });

        // Side navigation
        const sideNavBtns = document.querySelectorAll('.side-nav-btn');
        sideNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                this.switchTab(btn, index);
            });
        });
    }

    setupIntersectionObserver() {
        const options = {
            root: this.videoContainer,
            threshold: 0.5
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const index = parseInt(entry.target.dataset.index);
                if (entry.isIntersecting) {
                    this.currentVideoIndex = index;
                    this.playVideo(index);
                } else {
                    this.pauseVideo(index);
                }
            });
        }, options);

        // Observe videos when they're added
        this.videos.forEach(video => {
            this.observer.observe(video);
        });
    }

    setupKeyboardControls() {
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousVideo();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.nextVideo();
                    break;
                case ' ':
                    e.preventDefault();
                    this.toggleCurrentVideo();
                    break;
                case 'l':
                    this.toggleCurrentLike();
                    break;
                case 'm':
                    this.toggleCurrentMute();
                    break;
            }
        });
    }

    nextVideo() {
        if (this.isScrolling || this.currentVideoIndex >= this.videos.length - 1) return;
        
        this.isScrolling = true;
        this.currentVideoIndex++;
        this.scrollToVideo(this.currentVideoIndex);
    }

    previousVideo() {
        if (this.isScrolling || this.currentVideoIndex <= 0) return;
        
        this.isScrolling = true;
        this.currentVideoIndex--;
        this.scrollToVideo(this.currentVideoIndex);
    }

    scrollToVideo(index) {
        const targetVideo = this.videos[index];
        if (!targetVideo) return;

        targetVideo.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        setTimeout(() => {
            this.isScrolling = false;
        }, 800);
    }

    playVideo(index) {
        // Pause all other videos
        this.videos.forEach((videoItem, i) => {
            if (i !== index) {
                this.pauseVideo(i);
            }
        });

        // Play current video
        const videoItem = this.videos[index];
        const video = videoItem.querySelector('.video-player');
        const playPauseBtn = videoItem.querySelector('.play-pause-btn i');
        
        video.play().catch(e => console.log('Autoplay prevented:', e));
        playPauseBtn.className = 'fas fa-pause';
    }

    pauseVideo(index) {
        const videoItem = this.videos[index];
        if (!videoItem) return;
        
        const video = videoItem.querySelector('.video-player');
        const playPauseBtn = videoItem.querySelector('.play-pause-btn i');
        
        video.pause();
        playPauseBtn.className = 'fas fa-play';
    }

    togglePlayPause(video, playPauseBtn) {
        const icon = playPauseBtn.querySelector('i');
        
        if (video.paused) {
            video.play();
            icon.className = 'fas fa-pause';
        } else {
            video.pause();
            icon.className = 'fas fa-play';
        }
    }

    toggleMute(video, volumeBtn) {
        const icon = volumeBtn.querySelector('i');
        
        video.muted = !video.muted;
        icon.className = video.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
    }

    toggleLike(likeBtn) {
        const icon = likeBtn.querySelector('i');
        const countSpan = likeBtn.querySelector('.action-count');
        
        likeBtn.classList.toggle('liked');
        
        if (likeBtn.classList.contains('liked')) {
            icon.style.color = '#ff0050';
            // Simulate count increase
            const currentCount = this.parseCount(countSpan.textContent);
            countSpan.textContent = this.formatCount(currentCount + 1);
        } else {
            icon.style.color = '#fff';
            // Simulate count decrease
            const currentCount = this.parseCount(countSpan.textContent);
            countSpan.textContent = this.formatCount(currentCount - 1);
        }
    }

    toggleBookmark(bookmarkBtn) {
        const icon = bookmarkBtn.querySelector('i');
        
        bookmarkBtn.classList.toggle('bookmarked');
        
        if (bookmarkBtn.classList.contains('bookmarked')) {
            icon.style.color = '#ffc107';
        } else {
            icon.style.color = '#fff';
        }
    }

    toggleCurrentVideo() {
        const currentVideo = this.videos[this.currentVideoIndex];
        if (currentVideo) {
            const video = currentVideo.querySelector('.video-player');
            const playPauseBtn = currentVideo.querySelector('.play-pause-btn');
            this.togglePlayPause(video, playPauseBtn);
        }
    }

    toggleCurrentLike() {
        const currentVideo = this.videos[this.currentVideoIndex];
        if (currentVideo) {
            const likeBtn = currentVideo.querySelector('.like-btn');
            this.toggleLike(likeBtn);
        }
    }

    toggleCurrentMute() {
        const currentVideo = this.videos[this.currentVideoIndex];
        if (currentVideo) {
            const video = currentVideo.querySelector('.video-player');
            const volumeBtn = currentVideo.querySelector('.volume-btn');
            this.toggleMute(video, volumeBtn);
        }
    }

    showComments(index) {
        // Simulate showing comments
        alert(`Comments for video ${index + 1}:\n\n• "Amazing content! 🔥"\n• "Love this! ❤️"\n• "More please! 👏"`);
    }

    shareVideo(index) {
        const videoData = sampleVideos[index];
        if (navigator.share) {
            navigator.share({
                title: `Check out this video by @${videoData.username}`,
                text: videoData.description,
                url: window.location.href
            });
        } else {
            // Fallback for browsers without Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                this.showNotification('Link copied to clipboard!');
            });
        }
    }

    switchTab(btn, index) {
        // Remove active class from all buttons
        document.querySelectorAll('.side-nav-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Simulate different content for different tabs
        this.showNotification(`Switched to ${btn.querySelector('span').textContent} tab`);
    }

    parseCount(countStr) {
        const num = parseFloat(countStr);
        if (countStr.includes('K')) return Math.floor(num * 1000);
        if (countStr.includes('M')) return Math.floor(num * 1000000);
        return parseInt(countStr);
    }

    formatCount(count) {
        if (count >= 1000000) {
            return (count / 1000000).toFixed(1) + 'M';
        }
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count.toString();
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new VideoScrollApp();
});

// Add some additional utility functions for enhanced UX
document.addEventListener('DOMContentLoaded', () => {
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
            // Simulate search functionality
            console.log('Searching for:', query);
        }
    });

    // Handle navigation buttons
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            if (index === 0) {
                // Plus button - simulate upload
                alert('Upload feature would open here! 📹');
            } else if (index === 1) {
                // Profile button
                alert('Profile page would open here! 👤');
            }
        });
    });

    // Add loading states for better UX
    const style = document.createElement('style');
    style.textContent = `
        .video-item.loading .video-player {
            background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
        }
        
        @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }
    `;
    document.head.appendChild(style);
});