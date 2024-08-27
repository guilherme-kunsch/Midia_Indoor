package utils

import (
	"sync"
	"time"

	"github.com/marcelomd/pcg"
	"github.com/richardlehane/crock32"
)

type LockedPcg128 struct {
	mu  sync.Mutex
	pcg *pcg.Pcg128
}

func (p *LockedPcg128) Seed(a, b uint64) {
	p.mu.Lock()
	p.pcg.Seed(a, b)
	p.mu.Unlock()
}

func (p *LockedPcg128) Uint64() uint64 {
	p.mu.Lock()
	x := p.pcg.Uint64()
	p.mu.Unlock()
	return x
}

func (p *LockedPcg128) Uint128() (uint64, uint64) {
	p.mu.Lock()
	x, y := p.pcg.Uint128()
	p.mu.Unlock()
	return x, y
}

var idRng LockedPcg128
var keyRng LockedPcg128

func NewLockedPcg128() LockedPcg128 {
	return LockedPcg128{pcg: pcg.NewDefaultPcg128()}
}
func init() {
	t := uint64(time.Now().UnixNano())
	idRng = NewLockedPcg128()
	idRng.Seed(t, t)
	a, b := idRng.Uint128()
	keyRng = NewLockedPcg128()
	keyRng.Seed(a, b)
	crock32.SetDigits("0123456789ABCDEFGHJKMNPQRSTVWXYZ")
}

// New random ID.
func NewId() string {
	return crock32.Encode(idRng.Uint64())
}
