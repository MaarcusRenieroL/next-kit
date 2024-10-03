export const restAPIContent = `
export const GET = async () => {
  try {
    return generateSuccessMessage("Sample GET API", 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};

export const POST = async (req: Request) => {
  try {
  return generateSuccessMessage("Sample POST API", 201);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};


export const PUT = async (
  req: Request
) => {
  try {
    return generateSuccessMessage("Sample PUT API", 201);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};

export const DELETE = async (
  req: Request,
) => {
  try {
    return generateSuccessMessage("Sample DELETE API", 200);
  } catch (error) {
    return generateErrorMessage({ error }, 500);
  }
};
`