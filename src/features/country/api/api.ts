import { apiClient } from "@/lib/http";
import type { ApiResponse } from "@/types";
import type { Country, State, StateQuery } from "../types";

export const countriesApi = {
  /**
   * Get distinct operational countries (Public)
   */
  getCountries() {
    return apiClient.get<ApiResponse<Country[]>>("/countries");
  },

  /**
   * List and search geographical states / locations (Public)
   */
  getStates(query?: StateQuery) {
    return apiClient.get<ApiResponse<State[]>>("/countries/states", {
      params: query,
    });
  },
};
