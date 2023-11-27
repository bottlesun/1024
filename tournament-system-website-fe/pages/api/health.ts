// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data<T = any> =
  | Error
  | {
      data: T | null;
    };

type Error = {
  error: {
    code: number;
    message: string | null;
  };
};

type Health<T = any> = {
  message: string;
};

const handler: (req: NextApiRequest, res: NextApiResponse<Data<Health>>) => void = (req: NextApiRequest, res: NextApiResponse<Data<Health>>) => {
  // Google JSON Style Guide
  // https://google.github.io/styleguide/jsoncstyleguide.xml
  // HTTP 상태 + json 본문을 사용하여 응답

  // Only allow GET requests
  if (req.method !== "GET") {
    console.error(`error - Method Not Allowed`);

    res.status(405).json({
      error: {
        code: 102,
        message: "Method Not Allowed"
      }
    });

    // throw new Error("An unhealthy result");
  }

  try {
    res.status(200).json({
      data: {
        message: "A healthy result"
      }
    });
  } catch (err) {
    // @ts-ignore
    console.error(`error - ${err.message}`);

    // Check if we got a useful response
    if (axios.isAxiosError(err)) {
      if (err.response && err.response.status === 404) {
        // Return 404 error
        res.status(404).json({
          error: {
            code: 102,
            message: "Unable to find device"
          }
        });
      }
    } else {
      // Return 500 error
      res.status(500).json({
        error: {
          code: 102,
          message: "Failed to fetch Gateway data"
        }
      });
    }
  }
};

export default handler;
