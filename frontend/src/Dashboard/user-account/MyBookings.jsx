import useFetchData from "../../hooks/useFetchData";
const BASE_URL = import.meta.env.VITE_BASE_URL
import DoctorCard from "./../../components/Doctors/DoctorCard";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MyBookings = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/users/appointments/my-appointments`);

  return (
    <div>
      {loading && !error && <Loading />}
      {error && !loading && <Error />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor._id} />
          ))}
        </div>
      )}

      {!loading && !error && appointments.length === 0 && (
        <h2 className="mt-5 text-center leading-7 text-[20px] font-semibold text-primaryColor">
          You have not booked any doctor yet.
        </h2>
      )}
    </div>
  );
};

export default MyBookings;
