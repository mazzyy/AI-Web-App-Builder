// Template options for different types of websites
const templateOptions = {
    // Portfolio website templates
    portfolio: {
      name: "Portfolio Website",
      description: "A professional personal portfolio website",
      prompt: `**Hero Section**:
     - Full-screen background with a modern gradient or image.
     - Name, job title (e.g., "AI Engineer | Web Developer"), and a short tagline.
     - Call-to-action button (e.g., "Contact Me", "Download Resume").
     - Smooth scroll indicator.
  
  2. **About Section**:
     - Professional photo with a rounded border or shadow.
     - Brief introduction (2–3 paragraphs).
     - List of key skills (use icons or badges for tech stack like React, Python, Docker, etc.)
  
  3. **Projects Section**:
     - Grid or card layout with hover effects.
     - Each card includes project title, screenshot, short description, tech stack, and a link (GitHub or live demo).
     - Animation on scroll (fade-in or slide-up).
  
  4. **Experience Section**:
     - Timeline layout showcasing roles, companies, and durations.
     - Highlights of responsibilities and achievements.
     - Icons or logos for each company if possible.
  
  5. **Contact Section**:
     - Simple form (Name, Email, Message).
     - Display of social media links (LinkedIn, GitHub, Twitter).
     - Contact email and location.
  
  6. **Footer**:
     - Minimalist design with copyright.
     - Back-to-top button.
  
  **Styling & Tech Requirements**:
  - Use modern CSS (flexbox/grid, media queries).
  - Mobile-first design. Fully responsive on all screen sizes.
  - Smooth scrolling and basic animations.
  - Clean and modern typography (use Google Fonts).
  - Consistent color theme.`
    },
    
    // Landing page template
    landing: {
      name: "Landing Page",
      description: "A high-conversion product or service landing page",
      prompt: `**Hero Section**:
     - Bold, attention-grabbing headline that clearly states the value proposition.
     - Subheadline explaining the key benefit to the user.
     - High-quality hero image or illustration of the product/service.
     - Primary CTA button ("Get Started", "Try For Free") and secondary CTA ("Learn More").
     - Social proof indicators (customer logos, review stars, or user count).
  
  2. **Features Section**:
     - 3-5 key features with icons, brief descriptions, and visual examples.
     - Each feature highlights a specific benefit to the user.
     - Use a clean grid or card layout that scales well on mobile.
  
  3. **How It Works Section**:
     - Step-by-step explanation of the product/service process.
     - Numbered steps with icons or simple illustrations.
     - Brief, clear descriptions focusing on ease of use.
  
  4. **Testimonials/Social Proof**:
     - Customer testimonials with photos, names, and companies.
     - Brief, impactful quotes highlighting specific benefits.
     - Consider a carousel for multiple testimonials.
  
  5. **Pricing Section**:
     - Clear, transparent pricing options in a comparison table or cards.
     - Highlight recommended or popular plans.
     - Include feature lists for each pricing tier.
     - CTAs for each pricing option.
  
  6. **FAQ Section**:
     - Address common questions and objections.
     - Use collapsible accordions for clean presentation.
  
  7. **Final CTA Section**:
     - Reinforcement of the main value proposition.
     - Strong CTA with urgency element ("Start Today", "Join Now").
     - Optional money-back guarantee or risk reversal statement.
  
  8. **Footer**:
     - Contact information, privacy policy, terms links.
     - Additional resources or quick links.
     - Newsletter signup.
  
  **Styling & Tech Requirements**:
  - Clean, high-contrast design that emphasizes CTAs.
  - Consistent brand colors throughout.
  - Mobile-optimized with appropriate spacing and typography.
  - Fast-loading, optimized for conversion.
  - Clear visual hierarchy guiding users to take action.`
    },
    
    // E-commerce template
    ecommerce: {
      name: "E-commerce Store",
      description: "A modern e-commerce website template",
      prompt: `**Header Section**:
     - Clean navigation with categories dropdown.
     - Search bar with autocomplete functionality.
     - Shopping cart icon with item count.
     - User account access/login button.
     - Mobile-friendly hamburger menu.
  
  2. **Hero/Banner Section**:
     - Featured product or seasonal promotion.
     - Strong headline and subheadline.
     - CTA button ("Shop Now", "View Collection").
     - Optional carousel for multiple promotions.
  
  3. **Categories Section**:
     - Visual grid of product categories.
     - Each category with representative image.
     - Hover effects and clear labels.
     - Easy navigation to category pages.
  
  4. **Featured Products Section**:
     - Grid/list of top products.
     - Each product card includes:
        - Product image with hover alternative view
        - Product name
        - Price (with optional sale price)
        - Rating stars
        - Quick "Add to Cart" button
        - Wishlist/favorite icon
  
  5. **Benefits/USP Bar**:
     - Highlight key benefits (Free Shipping, Returns Policy, etc.)
     - Simple icons with brief descriptions.
     - Trustmarks and security indicators.
  
  6. **New Arrivals/Trending Section**:
     - Similar to featured products but with "New" or "Trending" badges.
     - Optional horizontal scrolling carousel.
  
  7. **Newsletter Signup**:
     - Email capture form with incentive offer (discount code).
     - Privacy assurance text.
     - Clean, attention-grabbing design.
  
  8. **Footer**:
     - Category links and site navigation.
     - Customer service information.
     - Social media links.
     - Payment method icons.
     - Legal links (Privacy, Terms, etc.)
  
  **Product Detail Page Elements**:
  - Large product images with gallery/zoom.
  - Clear pricing and availability information.
  - Size/color/variant selectors.
  - Detailed product description and specifications.
  - Add to Cart and Wishlist buttons.
  - Related/recommended products.
  
  **Styling & Tech Requirements**:
  - Clean, product-focused design.
  - Fast loading with image optimization.
  - Mobile-first approach for shopping on any device.
  - Consistent branding and color scheme.
  - Easy to navigate information architecture.`
    },
    
    // Blog/Magazine template
    blog: {
      name: "Blog/Magazine",
      description: "A content-focused blog or online magazine",
      prompt: `**Header Section**:
     - Clean, minimalist navigation.
     - Logo/site name prominently displayed.
     - Search functionality.
     - Optional category dropdown.
     - Subscribe/Sign-up button.
  
  2. **Featured Content Section**:
     - Hero article with large image.
     - Headline, excerpt, and author information.
     - Published date and estimated reading time.
     - Category tag.
  
  3. **Article Grid/List**:
     - Mix of card layouts for recent articles.
     - Each card includes:
        - Featured image
        - Headline
        - Brief excerpt
        - Author with small avatar
        - Publication date
        - Category tag
        - Reading time
  
  4. **Category Sections**:
     - Organized content by topics/categories.
     - Clear headings and "View All" options.
     - Different visual treatment for different categories.
  
  5. **Newsletter Capture**:
     - Email signup form with compelling reason to subscribe.
     - Description of newsletter content and frequency.
     - Privacy assurance.
  
  6. **Sidebar Elements** (for desktop):
     - Popular/trending articles.
     - Category list.
     - Tags cloud.
     - Social media follow buttons.
     - Optional ad space.
  
  7. **Individual Article Template**:
     - Large featured image.
     - Clear, readable typography for article body.
     - Author bio section with photo.
     - Social share buttons.
     - Related articles.
     - Comment section.
  
  8. **Footer**:
     - About section.
     - Quick links to important categories/pages.
     - Contact information.
     - Social media links.
     - Copyright and legal information.
  
  **Styling & Tech Requirements**:
  - Content-first design with excellent readability.
  - Typography hierarchy with attention to font size, weight, and spacing.
  - Responsive design that works well on all devices.
  - Fast loading with lazy-loaded images.
  - Dark mode option for comfortable reading.
  - Pagination or infinite scroll for browsing content.`
    },
    
    // SaaS/App Website
    saas: {
      name: "SaaS/App Website",
      description: "A website for software as a service or application",
      prompt: `**Hero Section**:
     - Clear, benefit-focused headline explaining what the software does.
     - Subheadline addressing the main pain point solved.
     - App screenshot, mockup, or animation showing the interface.
     - Primary CTA button ("Start Free Trial", "Sign Up") and secondary CTA ("How It Works", "See Demo").
     - Social proof elements (customer logos, user count, star rating).
  
  2. **Features Section**:
     - 3-6 key features with icons and screenshots.
     - Benefit-oriented descriptions, not just feature lists.
     - Interactive elements if possible (tabs, sliders, hover effects).
     - Each feature should address a specific user need or pain point.
  
  3. **How It Works Section**:
     - Step-by-step explanation of implementation or usage.
     - Visual timeline or numbered process.
     - Screenshots or animations of the app in action.
     - Emphasis on ease of use and quick setup.
  
  4. **Integration/Compatibility Section**:
     - Logos of platforms the app works with.
     - Brief explanation of integration capabilities.
     - API or developer resources callout if applicable.
  
  5. **Pricing Section**:
     - Transparent, simple pricing tiers.
     - Feature comparison across plans.
     - Highlight recommended or popular plan.
     - FAQ about billing, commitment, etc.
     - Clear CTAs for each pricing option.
  
  6. **Testimonials Section**:
     - Customer success stories with measurable results.
     - Video testimonials if available.
     - Case study snippets with "Read More" options.
     - Industry-specific testimonials if targeting multiple sectors.
  
  7. **Blog/Resources Preview**:
     - Featured articles or resources that establish authority.
     - Lead magnets like ebooks, webinars, or whitepapers.
     - Newsletter signup option.
  
  8. **Footer**:
     - Quick links to key pages (features, pricing, support).
     - Resources (documentation, API, community).
     - Contact information and social media.
     - Legal links and security badges.
  
  **Styling & Tech Requirements**:
  - Clean, professional interface that reflects the software's design.
  - Consistent use of brand colors and design elements.
  - Mobile responsive with appropriate interactions for touch devices.
  - Fast loading with optimized images and progressive loading.
  - Clear information hierarchy that guides users through the conversion funnel.`
    },
    event: {
      name: "Event/Conference",
      description: "A comprehensive template for events, conferences, and meetups",
      prompt: `1. **Hero Section**:
       - Large banner with event name, date, and location.
       - Prominent "Register Now" or "Buy Tickets" button.
       - High-impact background image or video that sets the event's theme.
       - Countdown timer to build urgency.
  
     2. **Event Highlights/Overview**:
       - Short description of the event's mission and purpose.
       - Key selling points (e.g., networking opportunities, keynote speakers, workshops).
       - Optional video or slideshow showcasing past events.
  
     3. **Speakers Section**:
       - Grid or card layout for speakers with photos, names, and titles.
       - Hover or modal effect to reveal bios or social links.
       - Optional "View Full Schedule" link.
  
     4. **Schedule/Agenda**:
       - Day-by-day or session-by-session breakdown.
       - Collapsible accordions for full session details (topic, speaker, time).
       - Emphasis on keynotes or main attractions.
  
     5. **Venue/Location Info**:
       - Map integration (static image or embedded map).
       - Venue address and directions.
       - Nearby accommodations or transport options.
  
     6. **Sponsors/Partners**:
       - Showcase logos of sponsors/partners in a grid layout.
       - Brief mention of sponsorship opportunities or partner benefits.
  
     7. **Testimonials**:
       - Short quotes or video testimonials from past attendees/speakers.
       - Highlight success stories or unique experiences.
  
     8. **FAQ Section**:
       - Address common questions about tickets, refunds, dress code, etc.
       - Collapsible accordions for easy browsing.
  
     9. **Footer**:
       - Email signup for event updates.
       - Social media links to follow event news.
       - Contact information for event organizers.
       - Legal or terms link for ticket policies.
  
     **Styling & Tech Requirements**:
     - Professional but vibrant design matching the event theme.
     - Mobile responsiveness to handle on-the-go ticket purchases.
     - Quick page load, especially for schedule and ticket links.
     - User-friendly navigation for exploring agenda, speakers, and venue.
     - Consistent branding across sections (colors, fonts, icons).`
    },
    restaurant: {
      name: "Restaurant",
      description: "A stylish, modern template for restaurants, cafés, or bakeries",
      prompt: `1. **Hero Section**:
       - Full-width background image featuring signature dish or interior shot.
       - Restaurant name/logo and a brief tagline.
       - Prominent "View Menu" or "Book a Table" button.
       - Option for a background video to showcase atmosphere.
  
     2. **About/Story Section**:
       - Brief history or unique story behind the restaurant.
       - Chef introduction with photo, if relevant.
       - Highlight special cuisines or accolades.
  
     3. **Menu Preview**:
       - Categorized sections (Starters, Main Courses, Desserts, Drinks).
       - High-quality dish images with short descriptions.
       - Emphasis on best-sellers or signature dishes.
       - Link to view full PDF menu or online ordering system.
  
     4. **Specials/Offers**:
       - Featured seasonal or limited-time dishes.
       - Discounts, happy hour, or combo deals.
       - Eye-catching banners or badges.
  
     5. **Gallery/Interior**:
       - Image gallery or slideshow of the restaurant ambiance.
       - Showcase of key dishes, interior décor, and staff.
       - Optional video tour for a more immersive feel.
  
     6. **Testimonials/Reviews**:
       - Star ratings from popular platforms (Yelp, Google).
       - Quotes from satisfied customers.
       - Option to display social media feeds for real-time reviews.
  
     7. **Reservation/Contact Section**:
       - Simple reservation form (Date, Time, Party Size, Contact info).
       - Address, phone number, and email for direct queries.
       - Embedded map or directions.
  
     8. **Footer**:
       - Business hours.
       - Social media links (Instagram, Facebook, etc.).
       - Newsletter signup for special offers.
       - Legal links (Privacy, Terms, etc.).
  
     **Styling & Tech Requirements**:
     - Warm, inviting color palette that complements food photography.
     - Mobile-first approach for easy on-the-go booking and menu browsing.
     - Quick loading optimized images.
     - Accessible navigation and large CTA buttons (especially for reservations).
     - Clear typography to highlight dish names and prices.`
    },
  
    // 3. Non-Profit/Charity Website Template
    nonProfit: {
      name: "Non-Profit/Charity",
      description: "A clean, informative template for charitable organizations and NGOs",
      prompt: `1. **Hero Section**:
       - Inspiring full-width image showcasing cause or beneficiaries.
       - Strong headline and subheadline emphasizing mission.
       - Prominent "Donate Now" or "Get Involved" button.
  
     2. **Mission Statement**:
       - Brief description of the organization’s goals and impact.
       - Key statistics or facts highlighting the need.
       - Optional short video or infographic for storytelling.
  
     3. **Programs/Initiatives**:
       - Grid or card layout describing various programs or campaigns.
       - Highlight successes, numbers served, or achievements.
       - Links to learn more or donate to specific programs.
  
     4. **How Donations Help**:
       - Breakdown of how funds are allocated.
       - Impact stories or case studies from real beneficiaries.
       - Visual representation of donation usage (pie charts or infographics).
  
     5. **Events/Volunteer Opportunities**:
       - Calendar or list of upcoming fundraisers or community events.
       - Volunteer sign-up form or call to action.
       - Photos of volunteers in action.
  
     6. **Testimonials/Success Stories**:
       - Quotes or short videos from people who have benefited.
       - Donor/partner testimonials about working with the organization.
       - Emphasis on real-world impact and positive change.
  
     7. **Partners/Sponsors**:
       - Display logos or mention of major supporters.
       - Brief note on partnership opportunities.
  
     8. **Footer**:
       - Email sign-up for newsletters or updates.
       - Social media channels.
       - Legal links, financial transparency, annual reports.
       - Contact info, address, phone, and donation hotline.
  
     **Styling & Tech Requirements**:
     - Compassionate and uplifting design with mission-focused imagery.
     - Clear, user-friendly donation flow (fewest clicks possible).
     - Mobile responsiveness to encourage donations on any device.
     - Highlight calls-to-action (Donate, Volunteer) in vibrant colors.
     - Trust-building elements: seals, certifications, or financial reports.`
    },
  
    // 4. Real Estate Listing Website Template
    realEstate: {
      name: "Real Estate Listings",
      description: "A property-focused template for realtors or property agencies",
      prompt: `1. **Header/Nav Section**:
       - Prominent logo, navigation (Buy, Rent, Sell, Contact).
       - Search bar (location, property type, price range).
       - Login/Register for user account if needed.
  
     2. **Hero/Search Section**:
       - Full-width background image/video of a prime property or local cityscape.
       - Search filters (location, property type, min/max price).
       - Clear CTA ("Find Your Dream Home", "Search Now").
  
     3. **Featured Listings**:
       - Grid or carousel with high-quality property images.
       - Key details (price, location, number of bedrooms, area).
       - Links to detailed property pages.
  
     4. **Property Highlights**:
       - Standout properties or recent listings.
       - Ribbon labels (New, Hot, Reduced Price).
       - Hover effect for quick stats or short descriptions.
  
     5. **Agents/Team Section**:
       - Profile cards for agents with photos, names, and contact links.
       - Brief bio or specialty (Residential, Commercial, Luxury).
       - CTA to schedule a call or meeting.
  
     6. **Neighborhood/Area Guides**:
       - Overview of popular neighborhoods.
       - Key info: schools, amenities, local attractions.
       - Interactive map or static location highlight.
  
     7. **Testimonials/Reviews**:
       - Client stories and feedback about buying/selling process.
       - Trust indicators (years of experience, successful deals).
       - Real photos of clients for authenticity.
  
     8. **Footer**:
       - Contact info, office address, phone, email.
       - Quick links (About Us, Blog, Careers).
       - Social media icons.
       - Legal (Privacy Policy, Terms of Use).
  
     **Property Detail Page**:
     - Large photo gallery or slideshow.
     - Detailed description, floor plans, amenities, property features.
     - Map showing exact location.
     - Contact form or agent details for inquiries.
     - Mortgage calculator or cost breakdown if applicable.
  
     **Styling & Tech Requirements**:
     - Professional, clean interface with real estate brand colors.
     - Mobile-friendly property grids and search filters.
     - Fast image loading and effective image optimization.
     - Clear CTA for scheduling viewings or contacting agents.
     - Filter functionality must be intuitive and quick.`
    },
  
    // 5. Corporate/Agency Website Template
    agency: {
      name: "Corporate/Agency",
      description: "A sleek, professional template for businesses, agencies, or consulting firms",
      prompt: `1. **Hero Section**:
       - Clean, minimalistic design with corporate branding.
       - Headline focusing on the key business offering or slogan.
       - Subheadline with a short overview of services.
       - CTA buttons ("Get a Quote", "Our Services").
  
     2. **Services/What We Do**:
       - Cards or columns outlining primary service offerings.
       - Icons or simple graphics representing each service.
       - Short, benefit-driven descriptions.
  
     3. **About/Why Us**:
       - Company background, founding story, or mission statement.
       - Highlight team expertise, values, or unique selling points.
       - Optional team member section with headshots.
  
     4. **Case Studies/Portfolio**:
       - Showcase of completed projects or client success stories.
       - Before-and-after results, metrics, or testimonials.
       - Links to detailed case studies for in-depth reading.
  
     5. **Testimonials**:
       - Client quotes with names, positions, and company logos.
       - Emphasis on quantitative results (e.g., "Increased ROI by 40%").
       - Optional video testimonials for added credibility.
  
     6. **Call-To-Action Block**:
       - A bold statement inviting users to take the next step.
       - "Request a Proposal," "Book a Consultation," or "Contact Us."
  
     7. **Blog/Insights**:
       - Preview of latest articles, market insights, or thought leadership pieces.
       - Encourage user to explore content for credibility.
       - Optional sign-up for updates or newsletter.
  
     8. **Footer**:
       - Company info, address, contact, business hours.
       - Social media links.
       - Legal links (Privacy, Terms, Compliance).
       - Optional awards or certifications badges.
  
     **Styling & Tech Requirements**:
     - Consistent use of brand colors, typography, and iconography.
     - Professional, uncluttered layout highlighting key value propositions.
     - Fully responsive with a polished, corporate feel.
     - Emphasis on trust signals (client logos, certifications).
     - Fast load speed, optimized for lead generation.`
    },
    comingSoon: {
      name: "Coming Soon/Under Construction",
      description: "A minimalist pre-launch template to build anticipation and capture leads",
      prompt: `1. **Hero Section**:
       - Simple background (gradient, abstract design, or relevant brand image).
       - Website or brand name and brief tagline.
       - Engaging headline like "Something Awesome is Coming Soon" or "We're Launching Shortly."
  
     2. **Countdown Timer**:
       - Prominent countdown clock showing days, hours, minutes, seconds until launch.
       - Encourages excitement and urgency.
  
     3. **Newsletter/Sign-Up Form**:
       - Single field for email or optional name and email.
       - CTA button ("Notify Me", "Stay Updated").
       - Brief privacy note or reassurance.
  
     4. **Social Media Links**:
       - Icons for Twitter, Instagram, LinkedIn, etc.
       - Encourages visitors to follow the brand for updates.
  
     5. **Teaser Content (Optional)**:
       - 1-2 sentences about what’s coming (product, service, event).
       - Subtle hints, features, or sneak peek images.
    
     6. **Footer**:
       - Minimalist with essential info: company name, contact email.
       - Legal links (if necessary), small copyright.
  
     **Styling & Tech Requirements**:
     - Minimal, clean design focusing on the countdown and sign-up form.
     - Responsive layout for quick, frictionless email collection on mobile.
     - Light loading (few images/elements).
     - On-expiration event: optional automatic redirect or a subtle "We're Live!" message.
     - Emphasis on brand colors for consistent feel.`
    },
  
    // 2. Photography/Creative Portfolio
    photography: {
      name: "Photography/Creative Portfolio",
      description: "A visual-centric site to showcase photo galleries, artwork, or creative projects",
      prompt: `1. **Hero Section**:
       - Full-screen slideshow or hero image showcasing best work.
       - Photographer/artist name and short tagline (e.g., "Capturing Moments | Lifestyle & Portrait").
       - Subtle call-to-action ("Explore My Work").
  
     2. **Portfolio/Gallery**:
       - Masonry or grid layout for images, ensuring a visually appealing arrangement.
       - Hover effects for image details or quick previews.
       - Category filters (e.g., Landscapes, Portraits, Street Photography) if applicable.
  
     3. **Featured Project/Showcase**:
       - Highlight a specific shoot or series (story-driven layout).
       - Larger images, behind-the-scenes details, or a short write-up.
  
     4. **About/Bio Section**:
       - A professional portrait or a personal photo.
       - Brief background, inspiration, style, or awards.
       - Social proof or notable mentions (e.g., published in magazines).
  
     5. **Services & Pricing** (Optional):
       - If offering sessions: list packages (weddings, portraits, events).
       - Feature-based breakdown of what’s included.
       - CTA: "Book a Session" or "Contact for Quotes."
  
     6. **Testimonials**:
       - Client feedback or quotes.
       - Photos from actual shoots for authenticity.
  
     7. **Contact/Booking Form**:
       - Name, email, project details, date/time requests (if relevant).
       - Additional contact methods: phone number, social media.
  
     8. **Footer**:
       - Social links (Instagram, Behance, YouTube).
       - Copyright, any professional affiliations.
       - Subtle brand or watermark.
  
     **Styling & Tech Requirements**:
     - Visually driven design that keeps the focus on images/artwork.
     - High-resolution image support with careful optimization for fast loading.
     - Responsive gallery layouts (masonry/grid) that adapt to various screen sizes.
     - Minimal text; let photography/art take center stage.
     - Easy navigation to browse different categories or collections.`
    }
  

  };

  //Gernal Template 
  templateOptions.universal = {
    name: "General Website",
    description: "Generate any type of frontend by describing your idea and customizing sections.",
    prompt: `Create a modern static website with the following settings:
  
  **Website Description**:
  $description
  
  **Branding**:
  - Primary Color: $color
  - Gradient or Theme: $gradient
  - Font Style: $font
  
  **Hero Section**:
  $hero
  
  **About Section**:
  $about
  
  **Features/Products**:
  $features
  
  **Contact Section**:
  $contact
  
  **Additional Notes**:
  $notes
  
  Use responsive, mobile-first HTML/CSS/JS. Focus on a clean layout and elegant typography. Include smooth scrolling and transitions.`
  };

  
  
  
  // Function to add template selection to UI
  function addTemplateSelectionToUI() {
    // Create template dropdown container
    const templateContainer = document.createElement('div');
    templateContainer.className = 'template-selector';
    
    // Create label
    const label = document.createElement('label');
    label.textContent = 'Choose a template:';
    templateContainer.appendChild(label);
    
    // Create select dropdown
    const select = document.createElement('select');
    select.id = 'templateSelect';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a template --';
    select.appendChild(defaultOption);
    
    // Add options from templates
    for (const [key, template] of Object.entries(templateOptions)) {
      const option = document.createElement('option');
      option.value = key;
      option.textContent = template.name;
      option.title = template.description;
      select.appendChild(option);
    }
    
    // Add select to container
    templateContainer.appendChild(select);
    
    // Create template info text
    const templateInfo = document.createElement('div');
    templateInfo.id = 'templateInfo';
    templateInfo.className = 'template-info';
    templateContainer.appendChild(templateInfo);
    
    // Add event listener to show template info
    select.addEventListener('change', function() {
      const selectedTemplate = this.value;
      if (selectedTemplate && templateOptions[selectedTemplate]) {
        templateInfo.textContent = templateOptions[selectedTemplate].description;
        
        // Update prompt input with template
        const promptInput = document.getElementById('promptInput');
        if (promptInput) {
          promptInput.value = templateOptions[selectedTemplate].prompt;
        }
      } else {
        templateInfo.textContent = '';
      }
    });
    
    // Add the template container to command component
    const commandComponent = document.getElementById('command-component');
    if (commandComponent) {
      // Insert before the command input
      const commandInput = commandComponent.querySelector('.command-input');
      if (commandInput) {
        commandComponent.insertBefore(templateContainer, commandInput);
      } else {
        commandComponent.appendChild(templateContainer);
      }
    }
  }

  // Add this to your templates.js file

// Add this to templates.js or create a new file called template-prompt.js

// Create the template prompt popup HTML structure
function createTemplatePromptPopup() {
   // Check if the popup already exists
   if (document.getElementById('template-prompt-popup')) {
     return;
   }
   
   // Create the popup container
   const promptPopup = document.createElement('div');
   promptPopup.id = 'template-prompt-popup';
   promptPopup.className = 'template-prompt-popup';
   
   // Create the popup content
   promptPopup.innerHTML = `
     <div class="prompt-popup-content">
       <div class="prompt-popup-header">
         <h3 id="prompt-popup-title">Template Prompt</h3>
         <span class="close-prompt-popup">&times;</span>
       </div>
       <div class="prompt-popup-body">
         <p id="prompt-popup-description">Edit the template prompt below:</p>
         <textarea id="prompt-popup-textarea" class="prompt-popup-textarea"></textarea>
       </div>
       <div class="prompt-popup-footer">
        
         <button id="generate-prompt-btn" class="generate-btn">Generate</button>
       </div>
     </div>
   `;
   
   // Add the popup to the document body
   document.body.appendChild(promptPopup);
   
   // Add event listeners
   const closeBtn = promptPopup.querySelector('.close-prompt-popup');
   const updateBtn = document.getElementById('update-prompt-btn');
   const generateBtn = document.getElementById('generate-prompt-btn');
   
   // Close popup when X is clicked
   if (closeBtn) {
     closeBtn.addEventListener('click', () => {
       closeTemplatePromptPopup();
     });
   }
   
   // Close popup when clicking outside
   promptPopup.addEventListener('click', (e) => {
     if (e.target === promptPopup) {
       closeTemplatePromptPopup();
     }
   });
   
   // Update prompt button
   if (updateBtn) {
     updateBtn.addEventListener('click', () => {
       const promptTextarea = document.getElementById('prompt-popup-textarea');
       const promptInput = document.getElementById('promptInput');
       
       if (promptTextarea && promptInput) {
         promptInput.value = promptTextarea.value;
         
         // Show notification
         const appManager = window.appManager;
         if (appManager && appManager.showNotification) {
           appManager.showNotification('Prompt updated!');
         }
       }
       
       closeTemplatePromptPopup();
     });
   }
   
   // Generate button
   if (generateBtn) {
     generateBtn.addEventListener('click', () => {
       const promptTextarea = document.getElementById('prompt-popup-textarea');
       const promptInput = document.getElementById('promptInput');
       
       if (promptTextarea && promptInput) {
         promptInput.value = promptTextarea.value;
         
         // Trigger generate
         const appManager = window.appManager;
         if (appManager && appManager.generateCode) {
           appManager.generateCode(promptTextarea.value);
         }
       }
       
       closeTemplatePromptPopup();
     });
   }
 }
 
 // Show the template prompt popup with content
 function showTemplatePromptPopup(template) {
   if (!template) return;
   
   // Create the popup if it doesn't exist
   createTemplatePromptPopup();
   
   // Get elements
   const popup = document.getElementById('template-prompt-popup');
   const title = document.getElementById('prompt-popup-title');
   const description = document.getElementById('prompt-popup-description');
   const textarea = document.getElementById('prompt-popup-textarea');
   
   // Update content
   if (title) title.textContent = `${template.name} Template`;
   if (description) description.textContent = template.description;
   if (textarea) textarea.value = template.prompt;
   
   // Show the popup
   if (popup) popup.classList.add('show');
   
   // Focus on the textarea
   if (textarea) {
     setTimeout(() => {
       textarea.focus();
     }, 100);
   }
 }
 
 // Close the template prompt popup
 function closeTemplatePromptPopup() {
   const popup = document.getElementById('template-prompt-popup');
   if (popup) {
     popup.classList.remove('show');
   }
 }
 
 // Modify the template selection function to show the prompt popup
 // In templates.js, update the selectTemplate function:
 
 function initTemplateModal() {
   // Get the modal elements
   const templateModal = document.getElementById("templateModal");
   const templateBtn = document.getElementById("templateBtn");
   const closeTemplateModal = document.getElementById("closeTemplateModal");
   const templateGrid = document.querySelector(".template-grid");
   
   // Add click event to button to open modal
   if (templateBtn) {
     templateBtn.addEventListener("click", function() {
       // Load templates into grid
       loadTemplateGrid();
       // Show modal
       templateModal.classList.add("show");
     });
   }
   
   // Add click event to close button
   if (closeTemplateModal) {
     closeTemplateModal.addEventListener("click", function() {
       templateModal.classList.remove("show");
     });
   }
   
   // Close modal when clicking outside
   window.addEventListener("click", function(event) {
     if (event.target === templateModal) {
       templateModal.classList.remove("show");
     }
   });
   
   // Function to load templates into grid
   function loadTemplateGrid() {
     templateGrid.innerHTML = "";
     
     // Add template cards to the grid
     for (const [key, template] of Object.entries(templateOptions)) {
       const templateCard = document.createElement("div");
       templateCard.className = "template-card";
       templateCard.dataset.template = key;
       
       templateCard.innerHTML = `
           <div class="template-card-header">${template.name}</div>
           <div class="template-card-body">${template.description}</div>
       `;
       
       // Add click event to select this template (after user select his template)

    
       templateCard.addEventListener("click", function() {
        console.log('after prompt click ',key)
         selectTemplate(key);
         templateModal.classList.remove("show");
       });
       
       templateGrid.appendChild(templateCard);
     }
   }
   
   // Function to select a template
   function selectTemplate(templateKey) {
     const template = templateOptions[templateKey];
     if (!template) return;
     
     // Show the template prompt popup instead of setting directly
     showTemplatePromptPopup(template);
   }
 }
 
 // Initialize everything when DOM is loaded
 document.addEventListener("DOMContentLoaded", function() {
   initTemplateModal();
   createTemplatePromptPopup();
 });

// Initialize template modal when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
   initTemplateModal();
});


  // Export for use in other files
  window.templateOptions = templateOptions;
  window.addTemplateSelectionToUI = addTemplateSelectionToUI;


  //Js for Gernal Tempalte with UI 

  function fillUniversalPrompt(template, data) {
    return template
      .replace(/\$description/g, data.description || "")
      .replace(/\$color/g, data.color || "#3498db")
      .replace(/\$gradient/g, data.gradient || "linear-gradient(to right, #3498db, #2ecc71)")
      .replace(/\$font/g, data.font || "Inter")
      .replace(/\$hero/g, data.hero || "")
      .replace(/\$about/g, data.about || "")
      .replace(/\$features/g, data.features || "")
      .replace(/\$contact/g, data.contact || "")
      .replace(/\$notes/g, data.notes || "");
  }
  //js for color picker

  document.addEventListener('DOMContentLoaded', function() {
    // Setup all custom color pickers
    setupColorPicker('selectedBrandColor', 'genColor');
    setupColorPicker('selectedGradientStart', 'genGradientStart');
    setupColorPicker('selectedGradientEnd', 'genGradientEnd');
    
    // Close all color pickers when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.custom-color-picker')) {
        document.querySelectorAll('.custom-color-picker').forEach(function(picker) {
          picker.classList.remove('open');
        });
      }
    });
    
    function setupColorPicker(selectedId, inputId) {
      const selectedColor = document.getElementById(selectedId);
      const hiddenInput = document.getElementById(inputId);
      const colorPicker = selectedColor.closest('.custom-color-picker');
      
      // Toggle palette visibility when clicking on selected color
      selectedColor.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Close other pickers
        document.querySelectorAll('.custom-color-picker').forEach(function(picker) {
          if (picker !== colorPicker) {
            picker.classList.remove('open');
          }
        });
        
        // Toggle this picker
        colorPicker.classList.toggle('open');
      });
      
      // Add click handlers to color swatches
      colorPicker.querySelectorAll('.color-swatch').forEach(function(swatch) {
        swatch.addEventListener('click', function(e) {
          const color = this.getAttribute('data-color');
          selectedColor.style.backgroundColor = color;
          selectedColor.setAttribute('data-color', color);
          hiddenInput.value = color;
          colorPicker.classList.remove('open');
        });
      });
    }
  });
  window.fillUniversalPrompt = fillUniversalPrompt;
  