import Link from 'next/link';


export default function Button({isLink, linkUrl, onClick, children, className, bg, hoverBg}) {
    const sharedClasses = `px-4 sm:px-7 py-4 bg-blue-950 hover:bg-indigo-950 rounded text-white 
        text-base leading-tight font-medium
        transition-colors duration-300 ease-in-out min-w-28 sm:min-w-40
        ${bg ? bg : 'bg-blue-950'}
        ${hoverBg ? hoverBg : 'hover:bg-indigo-950'}
    `;


    if (isLink && linkUrl) {
        return (
            <Link href={linkUrl}>
                <a className={`${sharedClasses} ${className}`}>
                    {children}
                </a>
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={`${sharedClasses} ${className}`}>
            {children}
        </button>
    );
}
