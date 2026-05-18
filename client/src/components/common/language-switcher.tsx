import { useLanguageStore } from "@/store/language-store";

const languages = [
    {
        label: "EN",
        value: "en",
    },
    {
        label: "हिं",
        value: "hi",
    },
    {
        label: "اردو",
        value: "ur",
    },
    {
        label: "РУ",
        value: "ru",
    },
] as const;

const LanguageSwitcher = () => {
    const { language, setLanguage } = useLanguageStore();

    return (
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
            {languages.map((item) => (
                <button
                    key={item.value}
                    onClick={() => setLanguage(item.value)}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                        language === item.value
                            ? "bg-white text-black"
                            : "text-white/60 hover:text-white"
                    }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default LanguageSwitcher;
