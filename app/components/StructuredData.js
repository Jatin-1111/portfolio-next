export default function StructuredData() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Jatin Kumar",
        "jobTitle": "Full-Stack Web Developer",
        "description": "Results-driven Full-Stack Web Developer skilled in Next.js, React.js, Tailwind CSS, Node.js, Express.js, and MongoDB.",
        "url": "https://jatinx.tech", // Updated URL
        "email": "off.jatin1111@gmail.com",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Chandigarh",
            "addressCountry": "IN"
        },
        "sameAs": [
            "https://github.com/Jatin-1111",
            "https://www.linkedin.com/in/jatin1011",
            "https://www.instagram.com/_jatin_1011/"
        ],
        "knowsAbout": [
            "Next.js",
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "JavaScript",
            "Full-Stack Development",
            "Web Development",
            "MERN Stack"
        ],
        "alumniOf": {
            "@type": "EducationalOrganization",
            "name": "University Institute of Engineering and Technology, Chandigarh"
        }
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Jatin Kumar Portfolio",
        "url": "https://jatinx.tech", // Updated URL
        "description": "Full-Stack Web Developer Portfolio showcasing modern web development projects",
        "author": {
            "@type": "Person",
            "name": "Jatin Kumar"
        },
        "inLanguage": "en-US",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://jatinx.tech/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    };

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "JatinX Tech - Web Development Services",
        "url": "https://jatinx.tech",
        "logo": "https://jatinx.tech/logo.png", // Create this!
        "description": "Professional web development services specializing in modern technologies",
        "provider": {
            "@type": "Person",
            "name": "Jatin Kumar"
        },
        "areaServed": "Worldwide",
        "serviceType": [
            "Web Development",
            "Full-Stack Development",
            "MERN Stack Development",
            "Next.js Development",
            "UI/UX Development"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7696316713", // Add your phone
            "contactType": "Customer Service",
            "email": "off.jatin1111@gmail.com",
            "availableLanguage": ["English", "Hindi"]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(personSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(websiteSchema)
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(organizationSchema)
                }}
            />
        </>
    );
}
