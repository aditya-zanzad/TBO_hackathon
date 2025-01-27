import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Dashboard from './Dashboard';
interface IFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const onSubmit = (data: IFormData) => {
    console.log(data);
    alert(isLogin ? 'Logged in successfully!' : 'Account created successfully!');
  };

  return (
    <div className='p-5'>
      <section className="bg-black min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              {isLogin ? 'Login to your account' : 'Create an account'}
            </h1>

            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white ">
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Enter a valid email address',
                    },
                  })}
                  className={`bg-gray-500 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="name@company.com"
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white ">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters long',
                    },
                  })}
                  className={`bg-gray-500 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="••••••••"
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
              </div>

              {/* Confirm Password Field */}
              {!isLogin && (
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block mb-2 text-sm font-medium text-white "
                  >
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    {...register('confirmPassword', {
                      required: 'Please confirm your password',
                      validate: (value, { password }) =>
                        value === password || 'Passwords do not match',
                    })}
                    className={`bg-gray-500 border text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="••••••••"
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {isLogin ? 'Login' : 'Create an account'}
              </button>
            </form>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
              <button
                onClick={toggleForm}
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                {isLogin ? 'Register here' : 'Login here'}
              </button>
            </p>
          </div>
        </div>
      </section>

      <Dashboard />
    </div>
  );
};

export default Login;
