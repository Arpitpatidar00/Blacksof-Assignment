import { Request, Response, NextFunction } from "express";
import { BaseController, HttpStatus } from "../utils/responseHandler.js";
import { FeatureBackendService } from "../services/feature.service.js";
import { asyncHandler, AppError } from "../utils/errors.js";

export class FeatureController extends BaseController {
  private featureService: FeatureBackendService;

  constructor() {
    super();
    this.featureService = new FeatureBackendService();
  }

  public getAll = asyncHandler(async (req: Request, res: Response) => {
    const cards = await this.featureService.findAll();
    return this.sendSuccess(res, cards, "Features retrieved successfully");
  });

  public getById = asyncHandler(async (req: Request, res: Response) => {
    const card = await this.featureService.findById(req.params.id);
    if (!card) throw new AppError("Feature card not found", HttpStatus.NOT_FOUND);
    return this.sendSuccess(res, card);
  });

  public create = asyncHandler(async (req: Request, res: Response) => {
    const count = await this.featureService.count();
    if (count >= 10) {
      throw new AppError(
        "Maximum limit of 10 feature cards reached. Please delete an existing card to add a new one.",
        HttpStatus.BAD_REQUEST
      );
    }
    const newCard = await this.featureService.create(req.body);
    return this.sendSuccess(res, newCard, "Feature created successfully", HttpStatus.CREATED);
  });

  public update = asyncHandler(async (req: Request, res: Response) => {
    const updatedCard = await this.featureService.update(req.params.id, req.body);
    if (!updatedCard) throw new AppError("Feature card not found", HttpStatus.NOT_FOUND);
    return this.sendSuccess(res, updatedCard, "Feature updated successfully");
  });

  public delete = asyncHandler(async (req: Request, res: Response) => {
    const deletedCard = await this.featureService.delete(req.params.id);
    if (!deletedCard) throw new AppError("Feature card not found", HttpStatus.NOT_FOUND);
    return this.sendSuccess(res, deletedCard, "Feature deleted successfully");
  });
}
