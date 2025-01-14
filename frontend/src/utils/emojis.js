export const funEmojis = [
    // Objects
    "📷", // Camera
    "📦", // Package
    "🔒", // Lock
    "🖊️", // Pen
    "📂", // Folder
    "🖥️", // Desktop Computer
    "🕹️", // Joystick
    "🎒", // Backpack
    "💼", // Briefcase
    "🧳", // Suitcase
    "🪄", // Magic Wand
    "🧴", // Lotion Bottle
  
    // Symbols
    "⏳", // Hourglass
    "⚡", // Lightning Bolt
    "🔥", // Flame
    "🌟", // Shining Star
    "🌀", // Swirl
    "♻️", // Recycling Symbol
    "❗", // Exclamation Mark
    "✅", // Checkmark
    "🎵", // Music Note
    "🔆", // Brightness Symbol
    "📶", // Signal Bars
    "🔔", // Notification Bell
  
    // Nature
    "🍁", // Maple Leaf
    "🌻", // Sunflower
    "🪴", // Potted Plant
    "🌲", // Pine Tree
    "🌊", // Ocean Wave
    "🌪️", // Tornado
    "🌋", // Volcano
    "🌿", // Green Leaf
    "🐚", // Seashell
    "🦜", // Parrot
    "🦢", // Swan
    "🦘", // Kangaroo
  
    // Games
    "🎲", // Dice
    "🧩", // Puzzle Piece
    "🎯", // Dartboard
    "🃏", // Playing Card
    "♟️", // Chess Piece
    "🎮", // Game Controller
    "🏆", // Trophy
    "🥇", // Gold Medal
  
    // Activities
    "🏊‍♂️", // Swimming
    "🚵‍♀️", // Mountain Biking
    "🧗", // Rock Climbing
    "🧘", // Yoga Pose
    "🎨", // Paint Palette
    "🎻", // Violin
    "📚", // Reading Book
    "✈️", // Travel Passport
  
    // Hobbies
    "🧵", // Thread and Needle
    "🧶", // Yarn Ball
    "📸", // Photography
    "🎤", // Singing Microphone
    "🍳", // Cooking Pan
    "🛠️", // Woodworking Tools
    "🌌", // Stargazing Telescope
    "🛹", // Skateboarding
  ];

export const getRandomEmoji = () => {
    return funEmojis[Math.floor(Math.random() * funEmojis.length)];
};