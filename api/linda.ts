// ...inside your sendMessage() catch block:
catch (err) {
  console.error("Error talking to Linda:", err);
  let errorMsg = "Oops, something went wrong.";
  try {
    const errorData = await res.json();
    if (errorData.error) {
      errorMsg = errorData.error;
    }
  } catch {}
  setMessages([...newConversation, { role: "assistant", content: errorMsg }]);
  setError(true);
}
