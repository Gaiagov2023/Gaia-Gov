import { useEffect, useState } from "react";
import { api } from "../utils/api";

export const useCountries = () => {
  const [countries, setCounties] = useState([
    { label: "No Data.", value: "", disabled: true },
  ]);

  useEffect(() => {
    async function getCountries() {
      try {
        if (countries.length > 1) {
          return countries;
        }
        const response = await api("/country/get-all-country", "GET");
        if (response.status === 200) {
          const responseData = response.data.map((item) => ({
            label: item.name,
            value: item.name,
          }));
          setCounties(responseData);
        }
      } catch (err) {}
    }

    getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { countries };
};
