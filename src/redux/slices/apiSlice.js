import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DELETE_TASK_API_URL, GET_TASKS_API_URL } from "../../utils/apiUrl";
import { deleteRequest, getRequest } from "../../utils/requestMethods";

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPatth = `${apiURL}/${userId}`;
    // console.log(fullPatth);
    return await getRequest(fullPatth);
  });
};

// get items data
export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems", //action type
  GET_TASKS_API_URL // 요청 url
); // thunk 함수 호출

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(apiURL, id);
    const options = {
      method: "DELETE",
    };
    const fullPatth = `${apiURL}/${id}`;
    return await deleteRequest(fullPatth, options);
  });
};

export const fetchDeleteItemData = deleteItemFetchThunk(
  "fetchDeleteItem", //action type
  DELETE_TASK_API_URL // 요청 url
);

const handleFulfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload; // action.payload에 응답 데이터가 들어있음
};

// handleRejected 함수 정의 : 요청 성공시 상태 업데이트 로직을 별도의 함수로 분리
const handleRejected = (state, action) => {
  console.log("Error", action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: "apis", // slice 기능 이름
  initialState: {
    // 초기 상태 지정
    getItemsData: null,
    deleteItemData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFulfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected)
      .addCase(fetchDeleteItemData.fulfilled, handleFulfilled("deleteItemData"))
      .addCase(fetchDeleteItemData.rejected, handleRejected);
  },
}); // slice 객체 저장

export default apiSlice.reducer;
