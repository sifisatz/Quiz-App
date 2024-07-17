"use client"
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import useGetQuizSettings from "@/hooks/useGetQuizSettings";
import useSettingsForm from "@/hooks/useSettingsForm";
import { useRouter } from "next/navigation";
import Input from "./ui/input";


const QuizSettings = () => {
  const router = useRouter();


  const { setName, category, setCategory, difficulty, setDifficulty, limit, setLimit } = useSettingsForm(state => ({
    setName: state.setName,
    category: state.category,
    setCategory: state.setCategory,
    difficulty: state.difficulty,
    setDifficulty: state.setDifficulty,
    limit: state.limit,
    setLimit: state.setLimit,
  }));


  const handleQuizStart = () => {
    router.push(
      `/questions?category=${category}&difficulty=${difficulty}&limit=${limit[0]}`
    );
  };

  const { data, error } = useGetQuizSettings();

  if (error) {
    return <> something went wrong    </>
  }
  if (data) {
    return (
      <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
        <Input label="Nickname" id="firstName" onChange={(e) => setName(e.target.value)} placeholder="Einstein" />

        <Select value={category} onValueChange={(value) => setCategory(value)}>
          <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {data?.categoryOptions.map((category) => (
              <SelectItem value={category.value} key={category.value}>
                {category.option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={difficulty}
          onValueChange={(value) => setDifficulty(value)}
        >
          <SelectTrigger className="w-full md:max-w-xs xl:max-w-md">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            {data?.difficultyOptions.map((difficulty) => (
              <SelectItem value={difficulty.value} key={difficulty.value}>
                {difficulty.option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm lg:text-sm font-semibold">
          Total Questions: {limit[0]}
        </p>
        <Slider
          value={limit}
          onValueChange={(value: number[]) => setLimit(value)}
          max={50}
          step={5}
          min={5}
          className="w-full md:max-w-xs xl:max-w-md"
        />
        <Button disabled={!difficulty || !category} onClick={handleQuizStart}>
          Start Quiz
        </Button>
      </div>
    );

  }
};

export default QuizSettings;
