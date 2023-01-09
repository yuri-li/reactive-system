enum ActivityRegion {
    shanghai = "上海", beijing = "北京"
}

enum ActivityType {
    OnlineActivities = "线上", PromotionActivities = "促销", OfflineActivities = "线下推广", SimpleBrandExposure = "品牌发布会",
}

enum ActivityResource {
    Sponsor = "赞助费", Venue = "场地",
}

namespace Activity {
    export class Create {
        activityName: string | undefined
        region: ActivityRegion | undefined
        time: Date | undefined
        delivery: boolean | undefined
        activityType: ActivityType | undefined
        resource: ActivityResource | undefined
        description: string | undefined
    }
}
export { ActivityRegion, ActivityType, ActivityResource, Activity }