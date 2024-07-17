"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { alphabeticNumeral, showCategory } from "@/constants";
import useModalStore from "@/hooks/useModalStore";
import useSettingsForm from "@/hooks/useSettingsForm";
import { calculatePoints } from "@/lib/utils";
import { Question } from "@/types/Question";
import { Difficulty } from "@/types/enums/Diffuculty";
import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { toast } from "sonner";

type Props = {
  questions: Question[];
  limit: number;
  category: string;
};

const Questions = ({ questions, limit, category }: Props) => {
  const [curr, setCurr] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [progressValue, setProgressValue] = useState(0);
  const [score, setScore] = useState(0);
  const { onOpen } = useModalStore();
  const [key, setKey] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsedTimes, setElapsedTimes] = useState<number[]>([]);
  const name = useSettingsForm(state => state.name)
  const handleShuffle = (correctAnswer: string, incorrectAnswers: string[]) => {
    const shuffledAnswers = [...incorrectAnswers];

    shuffledAnswers.sort(() => Math.random() - 0.5);
    const randomIndex = Math.floor(
      Math.random() * (shuffledAnswers.length + 1)
    );
    shuffledAnswers.splice(randomIndex, 0, correctAnswer);

    return shuffledAnswers;
  };

  const handleCheck = (answer: string, difficulty: Difficulty, isTimeUp: boolean = false) => {
    setSelected(answer);
    const endTime = new Date();
    if (startTime) {
      const elapsedTime = (endTime.getTime() - startTime.getTime()) / 1000;
      setElapsedTimes([...elapsedTimes, elapsedTime]);

      if (answer === questions[curr].correctAnswer && !isTimeUp) {
        const points = calculatePoints(elapsedTime, difficulty);
        setScore(score + points);
      }
    }

  };

  const handleSelect = (i: string) => {
    if (selected === i && selected === questions[curr].correctAnswer)
      return "correct";
    else if (selected === i && selected !== questions[curr].correctAnswer)
      return "incorrect";
    else if (i === questions[curr].correctAnswer) return "correct";
  };

  const handleNext = () => {
    setCurr((curr) => curr + 1);
    setSelected("");
    setKey((prevKey) => prevKey + 1);
    setStartTime(new Date());
  };

  const handleQuit = () => {
    onOpen("quitQuiz");
  };

  const handleShowResult = () => {
    onOpen("showResults", {
      score,
      limit,
    });
  };

  const handleTimeUp = () => {
    handleCheck(questions[curr].correctAnswer, questions[curr].difficulty, true);
    toast.info("You ran out of Time!");
  };

  useEffect(() => {
    if (questions?.length >= 5) {
      setAnswers(
        handleShuffle(
          questions[curr].correctAnswer,
          questions[curr].incorrectAnswers
        )
      );
      setStartTime(new Date()); // Set start time when question is displayed

    }
    setProgressValue((100 / limit) * (curr + 1));
  }, [curr, questions, limit]);

  return (
    <div className="bg-white px-3 py-5 md:p-6 shadow-md w-full md:w-[80%] lg:w-[70%] max-w-5xl rounded-lg">
      <Progress value={progressValue} />
      <div className="flex justify-between items-center py-3 xl:py-4 font-bold text-md">
        <p className="hidden md:block">{showCategory(category)}</p>
        <p>Nickname : {name}</p>
        <p>Score: {score}</p>
        <CountdownCircleTimer
          key={key}
          isPlaying={!selected}
          duration={15}
          size={45}
          strokeWidth={4}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[15, 8, 3, 0]}
          onComplete={handleTimeUp}
        >
          {({ remainingTime }) => (
            <div className="text-center">{remainingTime}</div>
          )}
        </CountdownCircleTimer>
      </div>
      <Separator />
      <div className="min-h-[50vh] py-4 xl:py-8 px-3 md:px-5 w-full">
        {questions.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-medium">{`Q${curr + 1}. ${questions[curr]?.question
              }`}</h2>
            <div className="py-4 md:py-5 xl:py-7 flex flex-col gap-y-3 md:gap-y-5">
              {answers?.map((answer, i) => (
                <button
                  key={i}
                  className={`option ${selected && handleSelect(answer)}`}
                  disabled={!!selected}
                  onClick={() => handleCheck(answer, questions[curr].difficulty)}
                >
                  {alphabeticNumeral(i)}
                  {answer}
                </button>
              ))}
            </div>
            <Separator />
            <div className="flex mt-5 md:justify-between md:flex-row flex-col gap-4 md:gap-0 mx-auto max-w-xs w-full">
              <Button
                disabled={!selected}
                onClick={() =>
                  questions.length === curr + 1
                    ? handleShowResult()
                    : handleNext()
                }
              >
                {questions.length - 1 != curr
                  ? "Next Question"
                  : "Show Results"}
              </Button>
              <Button variant={"destructive"} onClick={handleQuit}>
                Quit Quiz
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Questions;
