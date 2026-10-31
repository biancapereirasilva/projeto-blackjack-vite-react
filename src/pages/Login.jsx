import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ nome: "", senha: "" });
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErro("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.senha === import.meta.env.VITE_GAME_PASSWORD) {
      localStorage.setItem("auth", "true");
      navigate("/game");
    } else {
      setErro("Senha incorreta");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background)] p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4 rounded-lg bg-[#991B1B] p-8 text-[#FEF2F2]"
      >
        <h1 className="text-2xl font-bold" style={{ color: "#FACC15" }}>
          Login
        </h1>

        <input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          required
          className="rounded-lg bg-[#450A0A] p-3 placeholder:text-[#F87171] outline-none focus:ring-2 focus:ring-[#FACC15]"
        />
        <input
          name="senha"
          type="password"
          value={form.senha}
          onChange={handleChange}
          placeholder="Senha"
          required
          className="rounded-lg bg-[#450A0A] p-3 placeholder:text-[#F87171] outline-none focus:ring-2 focus:ring-[#FACC15]"
        />

        {erro && <p className="text-sm text-[#FACC15]">{erro}</p>}

        <button
          type="submit"
          className="rounded-lg bg-[#FACC15] p-3 font-bold text-[#450A0A] hover:opacity-90"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}