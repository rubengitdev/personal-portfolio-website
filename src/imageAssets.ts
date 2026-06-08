// Profile Image
import ruben_cahyadi_profile from './assets/images/ruben_cahyadi_profile.png?url';

// Project Preview Images
import project_preview_amazainCms from './assets/images/project_preview_glean_1780570877876.png?url';
import project_preview_notion from './assets/images/project_preview_slack_1780570896731.png?url';
import project_preview_mezzo from './assets/images/project_preview_mezzo_1780570911826.png?url';
import project_preview_bear from './assets/images/project_preview_bear_1780570927211.png?url';

// Design Story Images - amazainCms
import story_amazainCms_1 from './assets/images/story_glean_1_1780571598855.png?url';
import story_amazainCms_2 from './assets/images/story_glean_2_1780571615100.png?url';
import story_amazainCms_3 from './assets/images/story_glean_3_1780571630054.png?url';
import story_amazainCms_4 from './assets/images/story_glean_3_1780571630054.png?url';
import story_amazainCms_5 from './assets/images/story_glean_3_1780571630054.png?url';
import story_amazainCms_6 from './assets/images/story_glean_3_1780571630054.png?url';

// Design Story Images - Notion
import story_notion_1 from './assets/images/story_slack_1_1780571645802.png?url';
import story_notion_2 from './assets/images/story_slack_2_1780571663727.png?url';
import story_notion_3 from './assets/images/story_slack_3_1780571678797.png?url';
import story_notion_4 from './assets/images/story_slack_3_1780571678797.png?url';
import story_notion_5 from './assets/images/story_slack_3_1780571678797.png?url';
import story_notion_6 from './assets/images/story_slack_3_1780571678797.png?url';

// Design Story Images - Mezzo
import story_mezzo_1 from './assets/images/story_mezzo_1_1780571693911.png?url';
import story_mezzo_2 from './assets/images/story_mezzo_2_1780571707811.png?url';
import story_mezzo_3 from './assets/images/story_mezzo_3_1780571724967.png?url';
import story_mezzo_4 from './assets/images/story_mezzo_3_1780571724967.png?url';
import story_mezzo_5 from './assets/images/story_mezzo_3_1780571724967.png?url';
import story_mezzo_6 from './assets/images/story_mezzo_3_1780571724967.png?url';

// Design Story Images - The Bear Game
import story_bear_1 from './assets/images/story_bear_1_1780571738389.png?url';
import story_bear_2 from './assets/images/story_bear_2_1780571752553.png?url';
import story_bear_3 from './assets/images/story_bear_3_1780571768748.png?url';
import story_bear_4 from './assets/images/story_bear_3_1780571768748.png?url';
import story_bear_5 from './assets/images/story_bear_3_1780571768748.png?url';
import story_bear_6 from './assets/images/story_bear_3_1780571768748.png?url';

export const PROFILE_IMAGE = ruben_cahyadi_profile;

export const PREVIEW_IMAGES: Record<string, string> = {
  amazainCms: project_preview_amazainCms,
  notion: project_preview_notion,
  mezzo: project_preview_mezzo,
  bear: project_preview_bear,
};

export const STORY_IMAGES: Record<string, string[]> = {
  amazainCms: [
    story_amazainCms_1, // Step 1: Observing Core Clutter
    story_amazainCms_2, // Step 2: Keyboard Shortcut Loop
    story_amazainCms_3, // Step 3: Micro-Amended Latency
    story_amazainCms_4, // Step 4: The Visual Design Language
    story_amazainCms_5, // Step 5: The Iconography System
    story_amazainCms_6, // Step 6: The Interactive Prototyping Process
  ],
  notion: [
    story_notion_1, // Step 1: The Detached Canvas
    story_notion_2, // Step 2: Color Guide Resonance
    story_notion_3, // Step 3: Confetti Milestone
    story_notion_4, // Step 3: Confetti Milestone
    story_notion_5, // Step 3: Confetti Milestone
    story_notion_6, // Step 3: Confetti Milestone
  ],
  mezzo: [
    story_mezzo_1, // Step 1: The Social Heatmap
    story_mezzo_2, // Step 2: Visual Venue Swipe Engine
    story_mezzo_3, // Step 3: One-Click Verification
    story_mezzo_4,
    story_mezzo_5,
    story_mezzo_6,
  ],
  bear: [
    story_bear_1,  // Step 1: Card Vector Craft
    story_bear_2,  // Step 2: Game Balance Check
    story_bear_3,  // Step 3: Companion Event Engine
    story_bear_4,  // Step 3: Companion Event Engine
    story_bear_5,  // Step 3: Companion Event Engine
    story_bear_6,  // Step 3: Companion Event Engine
  ]
};
