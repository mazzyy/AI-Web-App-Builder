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
    }
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
  
  // Export for use in other files
  window.templateOptions = templateOptions;
  window.addTemplateSelectionToUI = addTemplateSelectionToUI;