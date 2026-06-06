export default function Notification({
  message,
  type = "success",
}) {

  if (!message) return null;

  const styles = {

    success: {
      border: "border-green-500",
      icon: "✓",
    },

    warning: {
      border: "border-yellow-500",
      icon: "⚠",
    },

    error: {
      border: "border-red-500",
      icon: "✕",
    },

  };

  const current =
    styles[type] ||
    styles.success;

  return (

    <div
      className={`
        fixed
        top-8
        right-8
        z-[9999]
        min-w-[320px]
        max-w-[450px]
        bg-white
        border-l-4
        ${current.border}
        shadow-2xl
        px-6
        py-5
        rounded-md
        animate-[fadeIn_.3s_ease]
      `}
    >

      <div className="flex items-center gap-4">

        <span className="text-lg font-semibold">

          {current.icon}

        </span>

        <p className="text-sm tracking-wide leading-relaxed">

          {message}

        </p>

      </div>

    </div>

  );

}