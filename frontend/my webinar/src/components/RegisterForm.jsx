import toast from "react-hot-toast";

const RegisterForm = ({ webinarId, close }) => {
  const handleRegister = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id;

    if (!userId) {
      toast.error("Please log in first");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/webinar/${webinarId}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Registered successfully!");
        close(); // close the modal
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold mb-4">Confirm Registration</h2>
        <p className="mb-6">Do you want to register for this webinar?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={close}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleRegister}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
