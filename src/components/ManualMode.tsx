interface IManuelModeProps {
  manualMode: Boolean;
  setManualMode: (manualMode: Boolean) => void;
}

export const ManualMode = (props: IManuelModeProps) => {
  return (
    <button
      id="manual-mode-btn"
      onClick={() => {
        if (!props.manualMode) {
          document.body.style.backgroundImage = `url('/src/assets/Cork-background.jpg')`;
        } else document.body.style.backgroundImage = "none";
        props.setManualMode(!props.manualMode);
      }}
    >
      ManualMode (Draggable Todos)
    </button>
  );
};
