import { container } from "tsyringe";
import { Env } from "./env";

container.register(Env, {
    useValue: Env.getEnv(),
});

export default container;
