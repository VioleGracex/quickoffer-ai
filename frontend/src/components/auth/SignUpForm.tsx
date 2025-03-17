import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faVk } from "@fortawesome/free-brands-svg-icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import useAuth from "../../routes/auth_api";
import { validateEmail, validateSignUpPassword } from "../../utils/validationUtils";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [fnameError, setFnameError] = useState<string | null>(null);
  const [lnameError, setLnameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null); // Declare serverError state
  const { signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let valid = true;

    if (fname.trim() === "") {
      setFnameError("Имя обязательно для заполнения");
      valid = false;
    } else {
      setFnameError(null);
    }

    if (lname.trim() === "") {
      setLnameError("Фамилия обязательна для заполнения");
      valid = false;
    } else {
      setLnameError(null);
    }

    if (!validateEmail(email)) {
      setEmailError("Неверный формат email");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!validateSignUpPassword(password)) {
      setPasswordError("Пароль должен содержать минимум 8 символов, включая буквы и цифры");
      valid = false;
    } else {
      setPasswordError(null);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Пароли не совпадают");
      valid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (!valid) {
      return;
    }

    try {
      await signUp({ email, password, first_name: fname, last_name: lname });
      navigate("/signin");
    } catch (err) {
      if (err.message === "Сервер недоступен. Пожалуйста, попробуйте позже.") {
        setServerError("Сервер недоступен. Пожалуйста, попробуйте позже.");
      } else {
        console.error("Error during sign-up:", err);
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="size-5" />
          Назад на главную страницу
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Регистрация
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Введите ваш email и пароль для регистрации!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <FontAwesomeIcon icon={faGoogle} size="lg" style={{ color: "#DB4437" }} />
                Зарегистрироваться с Google
              </button>
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <FontAwesomeIcon icon={faVk} size="lg" style={{ color: "blue" }} />
                Зарегистрироваться с VK
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Или
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Имя<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Введите ваше имя"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                    />
                    {fnameError && (
                      <p className="mt-2 text-sm text-red-600">{fnameError}</p>
                    )}
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Фамилия<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Введите вашу фамилию"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                    />
                    {lnameError && (
                      <p className="mt-2 text-sm text-red-600">{lnameError}</p>
                    )}
                  </div>
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите ваш email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {emailError && (
                    <p className="mt-2 text-sm text-red-600">{emailError}</p>
                  )}
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Пароль<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <Input
                      placeholder="Введите ваш пароль"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pr-10" // Prevents text from overlapping with the icon
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-gray-500 dark:text-gray-400 size-5"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-gray-500 dark:text-gray-400 size-5"
                        />
                      )}
                    </span>
                  </div>
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                  )}
                </div>

                {/* <!-- Confirm Password --> */}
                <div>
                  <Label>
                    Подтвердите пароль<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative w-full">
                    <Input
                      placeholder="Подтвердите ваш пароль"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pr-10" // Ensures text doesn't overlap with the icon
                    />
                    <span
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <FontAwesomeIcon
                          icon={faEye}
                          className="text-gray-500 dark:text-gray-400 size-5"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faEyeSlash}
                          className="text-gray-500 dark:text-gray-400 size-5"
                        />
                      )}
                    </span>
                  </div>
                  {confirmPasswordError && (
                    <p className="mt-2 text-sm text-red-600">
                      {confirmPasswordError}
                    </p>
                  )}
                </div>

                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    Создавая аккаунт, вы соглашаетесь с нашими{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Условиями использования,
                    </span>{" "}
                    и нашей{" "}
                    <span className="text-gray-800 dark:text-white">
                      Политикой конфиденциальности
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    type="submit"
                    disabled={loading}
                  >
                    Зарегистрироваться
                  </Button>
                </div>
              </div>
            </form>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {serverError && <p className="mt-2 text-sm text-red-600">{serverError}</p>}
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Уже есть аккаунт? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Войти
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}