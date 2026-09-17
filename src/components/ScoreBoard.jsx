function ScoreBoard({ playerScore, dealerScore }) {
  return (
    <div className="flex gap-4 px-6 py-4">
      <div className="flex flex-1 flex-col rounded-lg bg-[#F87171] px-4 py-2.5 text-[#450A0A]">
        <span className="text-[0.7rem] font-bold tracking-wide opacity-75">JOGADOR</span>
        <span className="text-[1.8rem] font-extrabold sm:text-[1.8rem] max-[480px]:text-[1.4rem]">
          {playerScore}
        </span>
      </div>
      <div className="flex flex-1 flex-col rounded-lg bg-[#F87171] px-4 py-2.5 text-[#450A0A]">
        <span className="text-[0.7rem] font-bold tracking-wide opacity-75">DEALER</span>
        <span className="text-[1.8rem] font-extrabold max-[480px]:text-[1.4rem]">
          {dealerScore}
        </span>
      </div>
    </div>
  );
}

export default ScoreBoard;