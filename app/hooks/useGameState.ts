export function useGameState() {
  const [state, setState] = useState<GameState>({
    candidateCoins: 50,
    signatures: 0,
    voterApproval: 0,
    currentModule: 0,
    currentTaskIndex: 0,
    quizzesCompleted: [],
  });

  const modifyState = (changes: StateChanges) => {
    setState((prev) => updateState(prev, changes));
  };

  const handleTaskCompletion = (taskId: string) => {
    if (!state.quizzesCompleted.includes(taskId)) {
      modifyState({
        quizzesCompleted: [...state.quizzesCompleted, taskId],
      });
    }
  };

  return {
    state,
    setState: modifyState,
    tasks: allTasks,              // <-- include tasks here
    handleTaskCompletion,         // <-- include handler here
  };
}

  return {
    state,
    setState: modifyState,
  };
}
