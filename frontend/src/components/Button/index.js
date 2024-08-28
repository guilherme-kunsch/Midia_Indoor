export default function Button({color, text, icon}) {
    return (
        <button className={`text-black ${color} py-4 px-10 rounded-lg`}>
            {icon && <span>{icon}</span>}
            {text}
        </button>
    )
}
