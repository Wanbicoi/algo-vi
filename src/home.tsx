/* eslint-disable @typescript-eslint/no-unused-vars */
import { Text, Inset, TextField, IconButton } from "@radix-ui/themes";
import Header from "./lib/components/common/header";
import AlgorithmList from "./lib/components/common/AlgorithmList";
import { useState } from "react";
import { DotsHorizontalIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useLanguage } from "./lib/components/common/LanguageContext";

export default function App() {
  const [isLightTheme, setIsLightTheme] = useState(
    localStorage.getItem("theme") !== "dark"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useLanguage();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
      <Header />
      <div className="flex items-center justify-center mt-8">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="logo.png"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
            }}
          />
        </Inset>{" "}
        <Text size="9" className="font-majorMono">
          Algo-Vi
        </Text>
      </div>
      <div className="flex items-center justify-center mt-5">
        <TextField.Root
          placeholder={t("placeholder")}
          radius="full"
          size="3"
          className="w-1/4"
          value={searchTerm}
          onChange={handleSearchChange}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
          <TextField.Slot pr="3">
            <IconButton size="2" variant="ghost">
              <DotsHorizontalIcon height="16" width="16" />
            </IconButton>
          </TextField.Slot>
        </TextField.Root>
      </div>
      <div className="flex items-center justify-center mt-8 bg-gray-100 dark:bg-gray-900">
        <AlgorithmList searchTerm={searchTerm} />
      </div>
    </div>
  );
}
