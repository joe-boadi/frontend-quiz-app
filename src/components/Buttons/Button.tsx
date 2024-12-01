type props = {
  buttonText: string;

  onclick: () => void;
};

function Button({ buttonText, onclick }: props) {
  return (
    <div>
      <button onClick={onclick} className="btn">
        {buttonText}
      </button>
    </div>
  );
}

export default Button;