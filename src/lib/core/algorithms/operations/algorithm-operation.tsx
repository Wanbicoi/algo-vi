import { ArrayAlgorithm } from "../../array-algorithm";
import ArrayOperations from "../../array-algorithm/operations";
import { BaseAlgorithm } from "../../base-algorithm";
import { TreeAlgorithm } from "../../tree-algorithm";
import TreeOperations from "../../tree-algorithm/operations";
import { AlgorithmName } from "../array-algo";

type Props = {
  algorithm: BaseAlgorithm;
  algorithmName: AlgorithmName;
};

export function Operation({ algorithmName, algorithm }: Props) {
  const operation: Record<AlgorithmName, React.ReactNode> = {
    "bubble-sort": <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />,
    "selection-sort": (
      <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />
    ),
    "quick-sort": <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />,
    "heap-sort": <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />,
    "linear-search": (
      <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />
    ),
    "insertion-sort": (
      <ArrayOperations algorithm={algorithm as ArrayAlgorithm} />
    ),
    "binary-search-tree": (
      <TreeOperations algorithm={algorithm as TreeAlgorithm} />
    ),
  };
  return operation[algorithmName];
}
