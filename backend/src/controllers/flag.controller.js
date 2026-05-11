import { prisma } from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const flagUser = asyncHandler(async (req, res) => {
     const userId = req.user.uid;
  const service = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const isAlreadyFlagged=await prisma.flagRecord.findFirst({
    where:{
        type:"USER",
        userId:userId
    }
  })
  if(!isAlreadyFlagged){
  await prisma.flagRecord.create({
    data:{
        type:"USER",
        userId:userId,
        adminreason:"",
        status:"PENDING"
    }
    
  })
    return res.status(200).json({
    message: "User Has been Flagged",
  });
}else{
      return res.status(200).json({
    message: "User Already Flagged",
  });
  }
  return res.status(200).json({
    message: "Service deleted successfully",
  });
});

