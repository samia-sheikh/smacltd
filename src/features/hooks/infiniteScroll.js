
// import { useState, useEffect, useCallback } from 'react';
// import useGetAPI from './useGetAPI';

// // Debounce function to limit the rate at which a function can fire
// const debounce = (func, wait) => {
//   let timeout;
//   return (...args) => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// };

// const useInfiniteScroll = () => {
//   const [isFetching, setIsFetching] = useState(false);  // State to track if data is being fetched
//   const [page, setPage] = useState(1);  // State to track the current page number
//   const { getData } = useGetAPI();  // Custom hook to get data from API

//   // Scroll handler to check if user has reached the bottom of the page
//   const handleScroll = useCallback(() => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop !==
//         document.documentElement.offsetHeight ||
//       isFetching
//     ) return;
//     setIsFetching(true);  // Set fetching state to true when bottom is reached
//   }, [isFetching]);

//   // Debounced version of the scroll handler
//   const debouncedHandleScroll = debounce(handleScroll, 500);

//   // Set up the scroll event listener
//   useEffect(() => {
//     window.addEventListener('scroll', debouncedHandleScroll);
//     return () => window.removeEventListener('scroll', debouncedHandleScroll);
//   }, [debouncedHandleScroll]);

//   // Fetch data when isFetching state changes to true
//   useEffect(() => {
//     if (!isFetching) return;
//     fetchScrollData();
//   }, []);

//   // Function to fetch data from API
//   const fetchScrollData = async (setLocalState) => {
//     try {
//      await getData(`/api/user/post?limit=6&page=${page}`,(response)=>{
//        const data = response.data;
//        if (data.length > 0) {
//         setLocalState(prevPosts => {
//           return mergeAndRemoveDuplicates(prevPosts, data)});  // Merge and remove duplicates
//          setPage(prevPage => prevPage + 1);  // Increment page number
//         }
//         setIsFetching(false);  // Set fetching state to false after data is fetched
//       });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setIsFetching(false);  // Set fetching state to false in case of an error
//     }
//   };

//   // Function to merge two arrays and remove duplicates based on postID
//   const mergeAndRemoveDuplicates = (array1, array2) => {
//     const mergedArray = [...array1, ...array2];
//     const uniqueArray = mergedArray.reduce((acc, current) => {
//       const x = acc.find(item => item.postID === current.postID);
//       if (!x) {
//         acc.push(current);
//       }
//       return acc;
//     }, []);
//     return uniqueArray;
//   };

//   // Return fetching state and fetchScrollData function
//   return { isFetching, setIsFetching, fetchScrollData };
// };

// export default useInfiniteScroll;
import { useState, useEffect, useCallback } from 'react';
import useGetAPI from './useGetAPI';

const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const useInfiniteScroll = () => {
  const [isFetching, setIsFetching] = useState(false);  // State to track if data is being fetched
  const [page, setPage] = useState(1);  // State to track the current page number
  const { getData } = useGetAPI();  // Custom hook to get data from API
  const [footerHeight, setFooterHeight] = useState(1000);  // State to track the current page number

  // Scroll handler to check if user has reached the bottom minus footer height
  const handleScroll = useCallback(() => {
    const scrolledDistance = window.innerHeight + window.pageYOffset;
    const totalPageHeight = document.documentElement.offsetHeight;

    // Trigger fetch when user reaches the page bottom minus the footer height
    if (scrolledDistance >= totalPageHeight - footerHeight && !isFetching) {
      setIsFetching(true);
    }
  }, [isFetching, footerHeight]);

  // Debounced version of the scroll handler
  const debouncedHandleScroll = debounce(handleScroll, 500);

  // Set up the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', debouncedHandleScroll);
    return () => window.removeEventListener('scroll', debouncedHandleScroll);
  }, [debouncedHandleScroll]);

  // Fetch data when isFetching state changes to true
  // useEffect(() => {
  //   if (!isFetching) return;
  //   fetchScrollData();
  // }, [isFetching]);

  // Function to fetch data from API
  const fetchScrollData = async (setLocalState) => {
    try {
      await getData(`/api/user/post?limit=6&page=${page}`, (response) => {
        const data = response.data;
        if (data.length > 0) {
          setLocalState((prevPosts) => mergeAndRemoveDuplicates(prevPosts, data));  // Merge and remove duplicates
          setPage((prevPage) => prevPage + 1);  // Increment page number
        }
        setIsFetching(false);  // Set fetching state to false after data is fetched
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsFetching(false);  // Set fetching state to false in case of an error
    }
  };

  // Function to merge two arrays and remove duplicates based on postID
  const mergeAndRemoveDuplicates = (array1, array2) => {
    const mergedArray = [...array1, ...array2];
    const uniqueArray = mergedArray.reduce((acc, current) => {
      const x = acc.find((item) => item.postId === current.postId);
      if (!x) {
        acc.push(current);
      }
      return acc;
    }, []);
    return uniqueArray;
  };

  // Return fetching state and fetchScrollData function
  return { isFetching, setIsFetching, fetchScrollData };
};

export default useInfiniteScroll;
