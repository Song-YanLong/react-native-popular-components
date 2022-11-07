
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNPopularComponentsSpec.h"

@interface PopularComponents : NSObject <NativePopularComponentsSpec>
#else
#import <React/RCTBridgeModule.h>

@interface PopularComponents : NSObject <RCTBridgeModule>
#endif

@end
