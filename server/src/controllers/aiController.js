import { generateImageWithGemini, analyzeImage, generateContent } from '../config/gemini.js';
import { generateImage, generateImageWithDimensions } from '../services/imageGenerator.js';
import { supabaseAdmin } from '../config/supabase.js';

// Helper to check if user is test user
const isTestUser = (userId) => userId && userId.startsWith('test-user-');

// @desc    Generate Face Swap
// @route   POST /api/ai/face-swap
// @access  Private
export const generateFaceSwap = async (req, res) => {
  try {
    const { sourceImage, targetImage } = req.body;
    const creditsRequired = 10;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 }; // Default for test users
    let generation = null;

    // Skip database operations for test users
    if (!isTest) {
      // Check user credits
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

      if (profile.credits < creditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits'
        });
      }

      // Create AI generation record
      const { data: generationData } = await supabaseAdmin
        .from('ai_generations')
        .insert([{
          user_id: req.user.id,
          tool: 'face-swap',
          input_data: { sourceImage, targetImage },
          credits_used: creditsRequired,
          status: 'processing'
        }])
        .select()
        .single();

      generation = generationData;
    }

    try {
      // Generate image with AI
      const prompt = `Create a realistic face swap combining features from two people. Professional photography quality, natural lighting, 4K resolution.`;

      const imageResult = await generateImage(prompt, { model: 'flux-realism' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      // Update generation record (skip for test users)
      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            output_url: imageUrl,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', generation.id);

        }

        // Deduct credits
          await supabaseAdmin
          .from('profiles')
          .update({ credits: profile.credits - creditsRequired })
          .eq('id', req.user.id);
      }

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      // Update generation record with error (skip for test users)
      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            status: 'failed',
            error_message: error.message
          })
          .eq('id', generation.id);

        }
      }

      throw error;
    }
  } catch (error) {
    console.error('Face swap error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate face swap'
    });
  }
};

// @desc    Generate AI Avatar
// @route   POST /api/ai/avatar
// @access  Private
export const generateAvatar = async (req, res) => {
  try {
    const { prompt, style } = req.body;
    const creditsRequired = 8;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

      if (profile.credits < creditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits'
        });
      }

      const { data: generationData } = await supabaseAdmin
        .from('ai_generations')
        .insert([{
          user_id: req.user.id,
          tool: 'ai-avatar',
          input_data: { prompt, style },
          credits_used: creditsRequired,
          status: 'processing'
        }])
        .select()
        .single();

      generation = generationData;
    }

    try {
      const fullPrompt = `${style || 'professional'} style avatar: ${prompt}. High quality digital art, detailed, vibrant colors, 4K resolution.`;

      // Generate image with AI
      const imageResult = await generateImage(fullPrompt, { model: 'flux' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            output_url: imageUrl,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', generation.id);

        }

          await supabaseAdmin
          .from('profiles')
          .update({ credits: profile.credits - creditsRequired })
          .eq('id', req.user.id);
      }

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            status: 'failed',
            error_message: error.message
          })
          .eq('id', generation.id);

        }
      }

      throw error;
    }
  } catch (error) {
    console.error('Avatar generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate avatar'
    });
  }
};

// @desc    Generate Duo Portrait
// @route   POST /api/ai/duo-portrait
// @access  Private
export const generateDuoPortrait = async (req, res) => {
  try {
    const { person1, person2, style } = req.body;
    const creditsRequired = 12;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

      if (profile.credits < creditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits'
        });
      }

      const { data: generationData } = await supabaseAdmin
        .from('ai_generations')
        .insert([{
          user_id: req.user.id,
          tool: 'duo-portrait',
          input_data: { person1, person2, style },
          credits_used: creditsRequired,
          status: 'processing'
        }])
        .select()
        .single();

      generation = generationData;
    }

    try {
      const prompt = `Professional duo portrait of two people: ${person1} and ${person2}. ${style || 'Elegant and sophisticated'} style. Perfect composition, studio lighting, high resolution, cinematic quality.`;

      // Generate image with AI
      const imageResult = await generateImage(prompt, { model: 'flux-realism' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            output_url: imageUrl,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', generation.id);

        }

          await supabaseAdmin
          .from('profiles')
          .update({ credits: profile.credits - creditsRequired })
          .eq('id', req.user.id);
      }

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {
        if (!isTest && generation) {

          await supabaseAdmin
          .from('ai_generations')
          .update({
            status: 'failed',
            error_message: error.message
          })
          .eq('id', generation.id);

        }
      }

      throw error;
    }
  } catch (error) {
    console.error('Duo portrait error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate duo portrait'
    });
  }
};

// @desc    Generate Poster
// @route   POST /api/ai/poster
// @access  Private
export const generatePoster = async (req, res) => {
  try {
    const { theme, text, style } = req.body;
    const creditsRequired = 10;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

    if (profile.credits < creditsRequired) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits'
      });
    }

    
      const { data: generationData } = await supabaseAdmin
      .from('ai_generations')
      .insert([{
        user_id: req.user.id,
        tool: 'poster-maker',
        input_data: { theme, text, style },
        credits_used: creditsRequired,
        status: 'processing'
      }])
      .select()
      .single();

      generation = generationData;
    }

    try {
      const prompt = `${style || 'Modern'} style poster with theme: ${theme}. Text: "${text}". Professional graphic design, vibrant colors, eye-catching composition, high quality, print-ready.`;

      // Generate image with AI (poster dimensions)
      const imageResult = await generateImageWithDimensions(prompt, 1024, 1792, { model: 'flux' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {


        await supabaseAdmin
        .from('ai_generations')
        .update({
          output_url: imageUrl,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', generation.id);


      }

        await supabaseAdmin
        .from('profiles')
        .update({ credits: profile.credits - creditsRequired })
        .eq('id', req.user.id);

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {

        await supabaseAdmin
        .from('ai_generations')
        .update({
          status: 'failed',
          error_message: error.message
        })
        .eq('id', generation.id);

      }

      throw error;
    }
  } catch (error) {
    console.error('Poster generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate poster'
    });
  }
};

// @desc    Age Transform
// @route   POST /api/ai/age-transform
// @access  Private
export const ageTransform = async (req, res) => {
  try {
    const { image, targetAge } = req.body;
    const creditsRequired = 10;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

    if (profile.credits < creditsRequired) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits'
      });
    }

    
      const { data: generationData } = await supabaseAdmin
      .from('ai_generations')
      .insert([{
        user_id: req.user.id,
        tool: 'age-transform',
        input_data: { image, targetAge },
        credits_used: creditsRequired,
        status: 'processing'
      }])
      .select()
      .single();

      generation = generationData;
    }

    try {
      const prompt = `Portrait of a person aged ${targetAge} years old. Realistic aging effects, natural skin texture, professional photography, 4K quality, photorealistic.`;

      // Generate image with AI
      const imageResult = await generateImage(prompt, { model: 'flux-realism' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {


        await supabaseAdmin
        .from('ai_generations')
        .update({
          output_url: imageUrl,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', generation.id);


      }

        await supabaseAdmin
        .from('profiles')
        .update({ credits: profile.credits - creditsRequired })
        .eq('id', req.user.id);

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {

        await supabaseAdmin
        .from('ai_generations')
        .update({
          status: 'failed',
          error_message: error.message
        })
        .eq('id', generation.id);

      }

      throw error;
    }
  } catch (error) {
    console.error('Age transform error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to transform age'
    });
  }
};

// @desc    Enhance Image
// @route   POST /api/ai/enhance
// @access  Private
export const enhanceImage = async (req, res) => {
  try {
    const { image, enhancementType } = req.body;
    const creditsRequired = 8;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

    if (profile.credits < creditsRequired) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient credits'
      });
    }

    
      const { data: generationData } = await supabaseAdmin
      .from('ai_generations')
      .insert([{
        user_id: req.user.id,
        tool: 'enhance',
        input_data: { image, enhancementType },
        credits_used: creditsRequired,
        status: 'processing'
      }])
      .select()
      .single();

      generation = generationData;
    }

    try {
      const prompt = `Enhanced high-resolution image with ${enhancementType || 'professional quality enhancement'}. Ultra HD, crystal clear details, perfect lighting, vibrant colors, professional photography quality.`;

      // Generate image with AI
      const imageResult = await generateImage(prompt, { model: 'flux-realism' });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate image');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {


        await supabaseAdmin
        .from('ai_generations')
        .update({
          output_url: imageUrl,
          status: 'completed',
          completed_at: new Date().toISOString()
        })
        .eq('id', generation.id);


      }

        await supabaseAdmin
        .from('profiles')
        .update({ credits: profile.credits - creditsRequired })
        .eq('id', req.user.id);

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {

        await supabaseAdmin
        .from('ai_generations')
        .update({
          status: 'failed',
          error_message: error.message
        })
        .eq('id', generation.id);

      }

      throw error;
    }
  } catch (error) {
    console.error('Image enhancement error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to enhance image'
    });
  }
};

// @desc    Generate AR Poster
// @route   POST /api/ai/ar-poster
// @access  Private
export const generateARPoster = async (req, res) => {
  try {
    const { style, title, theme } = req.body;
    const creditsRequired = 15;
    const isTest = isTestUser(req.user?.id);

    let profile = { credits: 1000 };
    let generation = null;

    if (!isTest) {
      const { data: profileData } = await supabaseAdmin
        .from('profiles')
        .select('credits')
        .eq('id', req.user.id)
        .single();

      profile = profileData;

      if (profile.credits < creditsRequired) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient credits'
        });
      }

      const { data: generationData } = await supabaseAdmin
        .from('ai_generations')
        .insert([{
          user_id: req.user.id,
          tool: 'ar-poster',
          input_data: { style, title, theme },
          credits_used: creditsRequired,
          status: 'processing'
        }])
        .select()
        .single();

      generation = generationData;
    }

    try {
      const promptText = `Create an amazing ${style || 'modern'} style poster${title ? ` with the theme "${title}"` : ''}${theme ? ` incorporating ${theme} elements` : ''}. Professional graphic design, vibrant colors, eye-catching composition, suitable for AR placement. Movie poster quality, 4K resolution, portrait orientation.`;

      // Generate poster with specific dimensions for AR (portrait)
      const imageResult = await generateImageWithDimensions(promptText, {
        width: 600,
        height: 900,
        model: 'flux-pro'
      });

      if (!imageResult.success) {
        throw new Error(imageResult.error || 'Failed to generate poster');
      }

      const imageUrl = imageResult.imageUrl;

      if (!isTest && generation) {
        await supabaseAdmin
          .from('ai_generations')
          .update({
            output_url: imageUrl,
            status: 'completed',
            completed_at: new Date().toISOString()
          })
          .eq('id', generation.id);
      }

      await supabaseAdmin
        .from('profiles')
        .update({ credits: profile.credits - creditsRequired })
        .eq('id', req.user.id);

      res.json({
        success: true,
        imageUrl,
        creditsUsed: creditsRequired,
        remainingCredits: profile.credits - creditsRequired
      });
    } catch (error) {
      if (!isTest && generation) {
        await supabaseAdmin
          .from('ai_generations')
          .update({
            status: 'failed',
            error_message: error.message
          })
          .eq('id', generation.id);
      }

      throw error;
    }
  } catch (error) {
    console.error('AR Poster generation error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate AR poster'
    });
  }
};

// @desc    Get user's AI generation history
// @route   GET /api/ai/history
// @access  Private
export const getHistory = async (req, res) => {
  try {
    const { data: generations, error } = await supabaseAdmin
      .from('ai_generations')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      generations: generations.map(gen => ({
        id: gen.id,
        tool: gen.tool,
        outputUrl: gen.output_url,
        creditsUsed: gen.credits_used,
        status: gen.status,
        createdAt: gen.created_at,
        completedAt: gen.completed_at
      }))
    });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
