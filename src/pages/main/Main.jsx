import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Home() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);



  return (
    <>
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .float-animation {
          animation: floatUpDown 4s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen max-h-m   flex flex-col bg-white pt-4 relative overflow-hidden items-center justify-center">

        {/* container بادکنک و متن کنار هم */}
        <div className="relative flex flex-row-reverse items-center justify-center w-full h-[72vh] px-4">

          {/* بادکنک سمت راست */}
          <img
            src="/images/baloon.svg"
            alt="balloon"
            className="relative  right-28  float-animation lg:relative lg:right-[130px] lg:h-full "
          />

          {/* متن سمت چپ */}
          <div className="flex flex-col gap-14 text-right justify-center absolute pr-9 w-full lg:right-[550px]">

            <div>

            <p className="text-right text-2xl font-[kalamehmedium] leading-tight lg:text-3xl">
              جشن تولد ۱۴ سالگی
            </p>

            <div className="flex items-center gap-2 mt-2">
              <img src="/images/makeenlogo.png" width={28} height={28} alt="logo" />
              <p className="text-3xl font-bold font-[kalamehmedium] lg:text-4xl">آکادمی مکین</p>
            </div>


            </div>

            <div className="mt-6 space-y-3 text-gray-500 text-sm font-semibold">

              <div className="flex items-center gap-2">
                <img src="/icons/calendar.svg" width={16} height={16} alt="calendar" />
                <p className="font-[kalamehregular] lg:text-lg">جمعه ۲۸ آذر ۱۴۰۴</p>
              </div>

              <div className="flex items-center gap-2">
                <img src="/icons/clock.svg" width={16} height={16} alt="clock" />
                <p className="font-[kalamehregular] lg:text-lg">ساعت ۱۵</p>
              </div>

              <div className="flex items-center gap-2">
                <img src="/icons/location.svg" width={16} height={16} alt="location" />
                <p className="font-[kalamehregular] lg:text-lg">سالن همایش مرکز نوآوری شریف</p>
              </div>

            </div>
          </div>
        </div>

        {/* دکمه‌ها */}
        <div className="flex flex-col max-w-[450px] w-full mx-auto space-y-4 mt-auto px-4 pb-6 z-10">

          <button
            onClick={checkCapacity}
            className="bg-[#01144f] text-white text-xl font-[kalamehregular]
             py-3 rounded-lg  transition w-full"
          >
            ثبت‌نام
          </button>

          <button
            onClick={() => navigate("/retrieve")}
            className=" hover:bg-gray-200 text-[#01144f] text-xl font-[kalamehregular] py-3 rounded-lg outline-2 outline-[#01144f] transition w-full"
          >
            دریافت مجدد کارت
          </button>

        </div>
      </div>


    </>
  );
}
