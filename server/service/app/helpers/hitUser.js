const getUserDetail = async(userId)=>{

return await axios({
  method: "GET",
  url: `http://localhost:4002/users/${userId}`,
});

}

module.exports = getUserDetail