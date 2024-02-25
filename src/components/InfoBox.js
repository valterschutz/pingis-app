export default function InfoBox({ text, isVisible }) {
  const animationDuration = 500

  return <div className={`${isVisible ? "opacity-100" : "opacity-0"} transition duration-500 h-20 bg-butterscotch text-lg w-full justify-self-end flex justify-center items-center`}
    style={isVisible ? { animation: 'fadeInUp', animationDuration: `${animationDuration}ms` } : {}}
  >
    {text}
  </div>
}
