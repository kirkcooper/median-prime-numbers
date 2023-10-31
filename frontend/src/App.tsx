import { ChangeEvent, FormEvent, useState } from 'react';
import { APIError, MedianPrimesResp, findMedianPrimes } from './api';
import { ErrorsAlert } from './components/ErrorsAlert';
import { MedianPrimes } from './components/MedianPrimes';

const App = () => {
  const [upperLimit, setUpperLimit] = useState<number>();
  const [medianPrimes, setMedianPrimes] = useState<MedianPrimesResp>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpperLimit(Number(e.target.value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (upperLimit === undefined) {
      return;
    }

    setLoading(true);
    try {
      const result = await findMedianPrimes(upperLimit);
      setMedianPrimes(result);
      setErrors([]);
    } catch (error) {
      let details;
      if (error instanceof APIError) {
        details = await error.details;
      }
      setMedianPrimes(undefined);
      setErrors(details?.message ?? ['Unexpected Error!']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold">Median Primes</h1>
            <p className="py-6">
              Given an upper limit of <code>n</code>, find the median prime
              number(s) of the set of prime numbers less <code>n</code>.
            </p>
          </div>

          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <input
                  type="number"
                  data-testid="n-input"
                  name="upperLimit"
                  min={2}
                  value={upperLimit}
                  onChange={handleChange}
                  placeholder="Enter the upper limit"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  data-testid="submit-btn"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-dots loading-lg text-primary"></span>
                  ) : (
                    'Find Median(s)'
                  )}
                </button>
              </div>

              <ErrorsAlert errors={errors} />
              {medianPrimes && <MedianPrimes medians={medianPrimes} />}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
