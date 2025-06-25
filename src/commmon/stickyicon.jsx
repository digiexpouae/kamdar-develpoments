import React from 'react'
import Image from 'next/image'

const StickyIcon = () => {
    const icons = [
        {
            src: '/assets/whatsapp.png',
            alt: 'WhatsApp',
            href: 'https://api.whatsapp.com/send?phone=971552896500&text=Hi', // Replace with your WhatsApp number
            title: 'Contact us on WhatsApp'
        },
        {
            src: '/assets/mail.png',
            alt: 'Email',
            href: 'mailto:reception@empiredevelopment.ae', // Replace with your email
            title: 'Send us an email'
        },
        {
            src: '/assets/phone.png',
            alt: 'Phone',
            href: 'tel:+971800700007', // Replace with your phone number
            title: 'Call us'
        }
    ]

    return (
        <div className='fixed top-[70%] z-[999] md:top-[70%] right-[-40px] flex flex-col gap-2'>
            {icons.map((icon, index) => (
                <a 
                    key={index}
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={icon.title}
                    className='w-[100px] h-[35px] bg-[#00000033] px-4 border flex justify-start items-center border-[#E0CF89] rounded-3xl hover:bg-[#00000066] transition-colors duration-200'
                >
                    <Image 
                        src={icon.src} 
                        width={27} 
                        height={19} 
                        alt={icon.alt}
                        className='!w-[17px] !h-[15px]'
                    />
                </a>
            ))}
        </div>
    )
}

export default StickyIcon