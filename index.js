const queryJsonFiles = async (files: string[]) => { 
  const responses: TokenList[] = (await Promise.all( 
    files.map(async (repo) => { 
      try { 
        const response = await fetch(repo); 
        const json = (await response.json()) as TokenList; 
        return json; 
      } catch { 
        console.info( 
          @solana/token-registry: falling back to static repository. 
        ); 
        return tokenlist; 
      } 
    }) 
  )) as TokenList[]; 
 
  return responses 
    .map((tokenlist: TokenList) => tokenlist.tokens) 
    .reduce((acc, arr) => (acc as TokenInfo[]).concat(arr), []); 
}; 
 
export enum Strategy { 
  GitHub = 'GitHub', 
  Static = 'Static', 
  Solana = 'Solana', 
  CDN = 'CDN', 
} 
 
export class StaticTokenListResolutionStrategy { 
  resolve = () => { 
    return tokenlist.tokens; 
  }; 
}
