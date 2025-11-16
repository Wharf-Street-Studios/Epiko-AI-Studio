// API Service for backend communication
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5001/api';
const DEMO_MODE = true; // Enable demo mode with mock images

// Get auth token from localStorage (Supabase session)
const getAuthToken = (): string | null => {
  try {
    const authData = localStorage.getItem('sb-qtaidcamesetdbpqkmjq-auth-token');
    if (authData) {
      const parsed = JSON.parse(authData);
      return parsed.access_token || null;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  return null;
};

// Demo mode: Mock image URLs for different tools
const MOCK_IMAGES = {
  'face-swap': [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=800&fit=crop',
  ],
  'ai-avatar': [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&h=800&fit=crop',
  ],
  'duo-portrait': [
    'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1505935428862-770b6f24f629?w=800&h=800&fit=crop',
  ],
  'poster-maker': [
    'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1574267432644-f610fa10fc8f?w=800&h=1200&fit=crop',
    'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&h=1200&fit=crop',
  ],
  'age-transform': [
    'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop',
  ],
  'enhance': [
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&h=800&fit=crop&q=100',
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&h=800&fit=crop&q=100',
    'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&h=800&fit=crop&q=100',
  ],
};

// Generate a random mock response
const generateMockResponse = (toolType: string): AIGenerationResponse => {
  const images = MOCK_IMAGES[toolType as keyof typeof MOCK_IMAGES] || MOCK_IMAGES['ai-avatar'];
  const randomImage = images[Math.floor(Math.random() * images.length)];

  return {
    success: true,
    imageUrl: randomImage,
    creditsUsed: 1,
    remainingCredits: 100,
    message: 'Demo mode: Image generated successfully',
  };
};

// Simulate API delay for realistic demo experience
const simulateDelay = (ms: number = 2000): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// API request helper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data?: T; message?: string; error?: string }> {
  const token = getAuthToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Request failed',
        message: data.message,
      };
    }

    return {
      success: true,
      data,
      ...data,
    };
  } catch (error) {
    console.error('API request failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

// AI Generation API Calls
export interface AIGenerationResponse {
  success: boolean;
  imageUrl?: string;
  creditsUsed?: number;
  remainingCredits?: number;
  message?: string;
  error?: string;
}

export interface AIHistoryItem {
  id: string;
  tool: string;
  outputUrl: string;
  creditsUsed: number;
  status: string;
  createdAt: string;
  completedAt: string;
}

export const aiAPI = {
  // Face Swap
  generateFaceSwap: async (sourceImage: string, targetImage: string): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(2500);
      return generateMockResponse('face-swap');
    }
    return apiRequest('/ai/face-swap', {
      method: 'POST',
      body: JSON.stringify({ sourceImage, targetImage }),
    });
  },

  // AI Avatar
  generateAvatar: async (prompt: string, style: string): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(3000);
      return generateMockResponse('ai-avatar');
    }
    return apiRequest('/ai/avatar', {
      method: 'POST',
      body: JSON.stringify({ prompt, style }),
    });
  },

  // Duo Portrait
  generateDuoPortrait: async (person1: string, person2: string, style: string): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(3500);
      return generateMockResponse('duo-portrait');
    }
    return apiRequest('/ai/duo-portrait', {
      method: 'POST',
      body: JSON.stringify({ person1, person2, style }),
    });
  },

  // Poster
  generatePoster: async (theme: string, text: string, style: string): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(3000);
      return generateMockResponse('poster-maker');
    }
    return apiRequest('/ai/poster', {
      method: 'POST',
      body: JSON.stringify({ theme, text, style }),
    });
  },

  // Age Transform
  ageTransform: async (image: string, targetAge: number): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(2800);
      return generateMockResponse('age-transform');
    }
    return apiRequest('/ai/age-transform', {
      method: 'POST',
      body: JSON.stringify({ image, targetAge }),
    });
  },

  // Enhance Image
  enhanceImage: async (image: string, enhancementType: string): Promise<AIGenerationResponse> => {
    if (DEMO_MODE) {
      await simulateDelay(2000);
      return generateMockResponse('enhance');
    }
    return apiRequest('/ai/enhance', {
      method: 'POST',
      body: JSON.stringify({ image, enhancementType }),
    });
  },

  // Get History
  getHistory: async (): Promise<{ success: boolean; generations?: AIHistoryItem[]; error?: string }> => {
    if (DEMO_MODE) {
      await simulateDelay(500);
      return { success: true, generations: [] };
    }
    return apiRequest('/ai/history', {
      method: 'GET',
    });
  },
};

// Helper function to map tool IDs to API calls
export const getAIApiFunction = (toolId: string) => {
  const apiMap: Record<string, any> = {
    'face-swap': aiAPI.generateFaceSwap,
    'ai-avatar': aiAPI.generateAvatar,
    'duo-portrait': aiAPI.generateDuoPortrait,
    'poster-maker': aiAPI.generatePoster,
    'age-transform': aiAPI.ageTransform,
    'enhance': aiAPI.enhanceImage,
  };
  return apiMap[toolId];
};

export default {
  aiAPI,
  getAIApiFunction,
};
